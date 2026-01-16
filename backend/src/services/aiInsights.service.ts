import ollama from "ollama";
import { SummaryList } from "../prompts/InsightsPrompt.ts";
import { buildAIAnalysisPrompt } from "../prompts/InsightsPrompt.ts";

export const generateAIInsights = async(summary: SummaryList)=> {
    const insightsPrompt = buildAIAnalysisPrompt(summary);
    const response = await ollama.chat({
        model: "llama3:8b",
        messages: [
            {role: "system", content: "You are a Financial Advisor providing concise and actionable user friendly financial insights."},
            {role: "user", content: insightsPrompt}
        ],
        options:{
            temperature: 0.6,
            num_predict: 600
        }
    })
    const insights = response.message.content;
    return insights;
}