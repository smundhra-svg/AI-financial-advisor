import axios from "axios";
import { buildTransactionalAnalysisPrompt } from "../prompts/transactionalAnalysis.ts";

export const generateAITransactions = async (transactions: any[], summary: any)=> {
    const prompt = buildTransactionalAnalysisPrompt(transactions,summary);
    const response = await axios.post(`${process.env.OLLAMA_API_URL}/generate`,{
        model : "llama3",
        prompt,
        stream: false,
    },{
        headers: {
            "Content-Type": "application/json",
        },
    });
    try {
        const data = response.data.response;
        const analyzedData = JSON.parse(data);
        console.log("Analyzed Data:", analyzedData);
        return analyzedData;
    } catch (error) {
        throw new Error("Failed to parse AI responses: " + error);
    }
}