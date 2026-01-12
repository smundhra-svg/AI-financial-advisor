import {Router} from "express";
import { analyzeTransactions } from "../controllers/analysis.controller.ts";

const aiRouter = Router();

aiRouter.get("/analyze",analyzeTransactions);

export default aiRouter;