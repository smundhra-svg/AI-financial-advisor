import { Request, Response } from "express";
import { calculateSummary } from "../services/summaryCalculator.ts";
import { generateAITransactions } from "../services/aiAnalysis.service.ts";
import { getTransactions } from "../store/transactions.store.ts";
import { generateAIInsights } from "../services/aiInsights.service.ts";
import { generateTxnHash } from "../utils/txnHash.ts";
import { txnRepo } from "../repos/txnRepo.ts";
import redisClient from "../config/redisClient.ts";

const REDIS_REVIEW_KEY = "single-user"; // Later we can make this dynamic based on the authenticated user

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
  
  await redisClient.set(
    REDIS_REVIEW_KEY,
     JSON.stringify({
      status: "DRAFT",
       transactions: categories
      }),
       {
        EX : 60*60*24
       });
  console.log("Redis set completed for key:", REDIS_REVIEW_KEY);

  const raw = await redisClient.get(REDIS_REVIEW_KEY);
  if(!raw){
    return res.status(500).json({error: "Failed to retrieve categorized transactions from Redis."});
  }
  const dataStr = typeof raw === "string" ? raw : raw.toString();
  res.json({message: "Transactions categorized and stored for review.", reviewKey: REDIS_REVIEW_KEY, data: JSON.parse(dataStr)});
};

export default REDIS_REVIEW_KEY;

