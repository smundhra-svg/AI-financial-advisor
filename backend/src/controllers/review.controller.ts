import { Request, Response } from "express";
import redisClient from "../config/redisClient.ts";
import REDIS_REVIEW_KEY from "./analysis.controller.ts";

export const updatedTransactions = async (req : Request, res: Response) => {
    try {
            // Here we will add a userId later, for now we will use a single user approach
            const {updates} = req.body;
            if(!updates || !Array.isArray(updates)){
                return res.status(404).json({error: "Invalid Updates payload"})
            }
            // We will gather the redis data then apply the updates to the transactions in the redis, later store in DB
            const data = await redisClient.get(REDIS_REVIEW_KEY);
            if(!data){
                return res.status(404).json({error: "No transactions found in redis store for the user key", REDIS_REVIEW_KEY});
            }
            const draft = JSON.parse(data.toString());
            for(const update of updates){
                const txn = draft.transactions.find((t:any)=> t.tempId === update.tempId);
                if(txn){
                    txn.category = update.category;
                }
            }
            await redisClient.set(REDIS_REVIEW_KEY,JSON.stringify(draft),{EX: 60*60*24});
            return res.json({message: "Draft Updated Successfully"});
    } catch (error) {
        console.log("Error in updating the transactions");
        return res.status(500).json({error: "Failed to update transactions"});
    }
};