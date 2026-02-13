import {Request, Response} from "express";
import REDIS_REVIEW_KEY from "./analysis.controller.ts";
import redisClient from "../config/redisClient.ts";
import { RecordsDatabase, RecordsParsedFromRedis } from "../DTO/dtos.ts";
import { generateTxnHash } from "../utils/txnHash.ts";
import { txnRepo } from "../repos/txnRepo.ts";


export const saveTransctions = async (req: Request,res:Response)=> {
    console.log("Storing to Db ...");
    const userId = "single-user"; //Since we are single user, we will keep this static and later we will fetch it from the db itself.
    // Get the data from redis (DRAFT or EDITED).
    const redisData = await redisClient.get(REDIS_REVIEW_KEY);
    if(!redisData) return res.status(404).json({error: "No Data Found in Redis storage"});

    const parsedRedisData: RecordsParsedFromRedis = JSON.parse(redisData.toString());
    const records = parsedRedisData.transactions.map((txn:RecordsDatabase) => {
        const txnHash = generateTxnHash(txn.txnDate,txn.description,txn.category,txn.amount,txn.type);
        return{
            userId,
            txnHash,
            txnDate: new Date(txn.txnDate),
            description: txn.description,
            category: txn.category,
            amount: txn.amount,
            type: txn.type,
            tempId: txn.tempId,
        };
    });

    console.log("Prepared DB records:", records);
    const hashes = records.map((rec)=> rec.txnHash);
    const exisitingHashes = await txnRepo.findExistingHashes(userId,hashes);

    const newRecords = records.filter((rec)=> !exisitingHashes.has(rec.txnHash));
    if(newRecords.length > 0){
        try {
            console.log("New records to insert : ",newRecords.length);
            await txnRepo.insertManyTxns(newRecords);
            console.log("New transactions inserted in the Database successfully");
        } catch (error) {
            console.error("Error Adding new transactions " , error);
        }
    }
    console.log(`DB Ingestion → inserted: ${newRecords.length}, skipped: ${
      records.length - newRecords.length
    }`  
    );

    //Now that our data has been stored inside our database we will be generating the charts and summaries and insights 
    res.json({message:"Data Stored inside Database Successfully",newRecords});
}