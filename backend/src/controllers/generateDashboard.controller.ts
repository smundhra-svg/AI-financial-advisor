import {Request,Response} from "express"
import { txnRepo } from "../repos/txnRepo.ts"
import { RecordsDatabase } from "../DTO/dtos.ts";
import { calculateSummary } from "../services/summaryCalculator.ts";
import { generateAITransactions } from "../services/aiAnalysis.service.ts";
import { generateAIInsights } from "../services/aiInsights.service.ts";

export const generateDashboardController = async(req : Request, res: Response)=> {
    try {
        // Below field will become a dynamic id that is userId as the app will support multi-user flow
        const userId = "single-user";
        const data = await txnRepo.getAllForUser(userId);
        if(!data.length){
            return res.status(400).json("Failed to fetch data from the database");
        }
        // Using the data from db we will generate the summary and insights.
        const summary = calculateSummary(data);
        console.log("Summary generated", summary);

        const insights = await generateAIInsights(summary);
        console.log("AI Insights generated successfully");

        res.json({data,summary,insights});
    } catch (error) {
        console.log("Something went wrong fetching the data",error);
    }
}