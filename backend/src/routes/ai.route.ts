import {Router} from "express";
import { analyzeTransactions } from "../controllers/analysis.controller.ts";
import { updatedTransactions } from "../controllers/review.controller.ts";

const aiRouter = Router();

aiRouter.get("/analyze",analyzeTransactions);

aiRouter.patch("/review",updatedTransactions);

export default aiRouter;