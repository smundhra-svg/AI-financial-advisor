import { Request, Response } from "express";
import { calculateSummary } from "../services/summaryCalculator.ts";
import { generateAITransactions } from "../services/aiAnalysis.service.ts";
import { getTransactions } from "../store/transactions.store.ts";

export const analyzeTransactions = async (
  _: Request,
  res: Response
) => {
    // This is where the db call would go to fetch all the transactions
   const transactions = getTransactions();
    // Since we do not have a db, we will be directly using the data from local server.
    if(!transactions || transactions.length === 0){
        return res.status(400).json({error: "No transactions found. Please upload a file first."});
    }
  const summary = calculateSummary(transactions);

  const analysis = await generateAITransactions(transactions, summary);

  res.json(analysis);
};
