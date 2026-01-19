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
  
  const categories = await generateAITransactions(transactions);
  if(!categories || categories.length === 0){
    return res.status(400).json({error: "Failed to categorize transactions."});
  }
  //Calculate summary based on categorized transactions
  const summary = calculateSummary(categories);
  console.log("Summary calculated:", summary);

  // Generate AI insights based on the summary
  console.log("Generating AI insights...");
  const insights = await generateAIInsights(summary);
  console.log("AI Insights Generated:", insights);
  res.json({categories,summary, insights});
  
};
