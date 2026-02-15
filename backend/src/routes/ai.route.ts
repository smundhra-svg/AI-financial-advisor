import {Router} from "express";
import { analyzeTransactions } from "../controllers/analysis.controller.ts";
import { updatedTransactions } from "../controllers/review.controller.ts";
import { saveTransctions } from "../controllers/save.controller.ts";
import { generateDashboardController } from "../controllers/generateDashboard.controller.ts";

const aiRouter = Router();

//This route is for generating AI categories for transactions and storing it as a draft inside the Redis Database
aiRouter.get("/analyze",analyzeTransactions);

//This route is for manual editing the categories of the transactions from the user end and convert the redis database from draft to final ready to store data
aiRouter.patch("/review",updatedTransactions);

//This is to save the data in the database no matter if the user wants to edit the transactions or not. 
aiRouter.post("/save",saveTransctions);

//This route is to generate all the charts and summaries(function based) and advisory from the AI 
aiRouter.get("/generate",generateDashboardController);

export default aiRouter;