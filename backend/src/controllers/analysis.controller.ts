import { Request, Response } from "express";
import { calculateSummary } from "../services/summaryCalculator.ts";
import { generateAITransactions } from "../services/aiAnalysis.service.ts";
import { getTransactions } from "../store/transactions.store.ts";
import { generateAIInsights } from "../services/aiInsights.service.ts";

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
    // Generating Category wise transaction analysis using AI
   const categoryWiseTransaction = await generateAITransactions(transactions);
   console.log("Category wise transaction analysis:", categoryWiseTransaction);
    // Since we do not have a db, we will be directly using the data from local server.
    if(!categoryWiseTransaction || categoryWiseTransaction.length === 0){
        return res.status(400).json({error: "Failed to categorize transactions."});
    }
  const summary = calculateSummary(categoryWiseTransaction);
  console.log("Summary calculated:", summary);
  
  // console.log(typeof(analysis));
  console.log("Generating AI insights...");
  const insights = await generateAIInsights(summary);
  console.log("AI Insights Generated:", insights);
  res.json(summary);
};
