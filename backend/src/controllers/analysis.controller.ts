import { Request, Response } from "express";
import { calculateSummary } from "../services/summaryCalculator.ts";
import { generateAITransactions } from "../services/aiAnalysis.service.ts";
import { getTransactions } from "../store/transactions.store.ts";
import { generateAIInsights } from "../services/aiInsights.service.ts";
import { generateTxnHash } from "../utils/txnHash.ts";
import { txnRepo } from "../repos/txnRepo.ts";

export const analyzeTransactions = async (
  _: Request,
  res: Response
) => {

  console.log("Analyzing transactions...");
    // This is where the db call would go to fetch all the transactions
    //Getting the Parsed Transactions from the in-memory store
   const transactions = getTransactions();
   if(!transactions || transactions.length === 0){
        return res.status(400).json({error: "No transactions found. Please upload a file first."});
    }
  
  const categories = await generateAITransactions(transactions);
  if(!categories || categories.length === 0){
    return res.status(400).json({error: "Failed to categorize transactions."});
  }

  //Persist categorized transactions 
  const userId = "single-user"; // future: from auth
  const records = categories.map((txn)=> {
    const txnHash = generateTxnHash(txn.txnDate, txn.category, txn.amount, txn.type);
    return {
      userId,
      txnHash,
      txnDate: new Date(txn.txnDate),
      category: txn.category,
      amount: txn.amount,
      type: txn.type,
    };
  });
  console.log("Prepared DB records:", records);
  const hashes = records.map((rec)=> rec.txnHash);
  const exisitingHashes = await txnRepo.findExistingHashes(userId, hashes);

  const newRecords = records.filter((rec)=> !exisitingHashes.has(rec.txnHash));
  if(newRecords.length > 0){
    try{
       console.log("New records to insert:", newRecords.length);
       await txnRepo.insertManyTxns(newRecords);
      console.log("New transactions inserted successfully");
    }catch(err){
      console.error("Error inserting new transactions:", err);
    }
  }

  console.log(
    `DB Ingestion → inserted: ${newRecords.length}, skipped: ${
      records.length - newRecords.length
    }`
  );
  //Calculate summary based on categorized transactions
  const summary = calculateSummary(categories);
  console.log("Summary calculated:", summary);

  // Generate AI insights based on the summary
  console.log("Generating AI insights...");
  const insights = await generateAIInsights(summary);
  console.log("AI Insights Generated:", insights);
  res.json({categories,summary, insights});
  
};

