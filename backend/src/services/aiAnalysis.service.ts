import { buildTransactionalAnalysisPrompt } from "../prompts/transactionalAnalysis.ts";
import { buildCategoryAnalysisPrompt } from "../prompts/categoryStreamline.ts";
import ollama from 'ollama';
import { systemPrompt } from "../prompts/systemPrompt.ts";

// Utility to handle JSON parsing safely
const cleanJson = (raw: string) => {
    try {
        // Find the first '[' and last ']' to strip any AI preamble or backticks
        const jsonStart = raw.indexOf('[');
        const jsonEnd = raw.lastIndexOf(']') + 1;
        return JSON.parse(raw.slice(jsonStart, jsonEnd));
    } catch (e) {
        throw new Error("AI returned invalid JSON: " + raw);
    }
};
export const generateAITransactions = async (transactions: any[])=> {
    // const prompt = buildTransactionalAnalysisPrompt(transactions,summary);
    const categoryPrompt = buildCategoryAnalysisPrompt(transactions);
    
    const response = await ollama.chat({
        model: 'llama3:8b',
        messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: categoryPrompt }
            ],
        format: "json",
        options:{
            temperature: 0,
            num_predict: 2048
        },
        keep_alive: "1h",
    })
    try {
        const rawContent = response.message.content;
        const cleanJsondata = cleanJson(rawContent);
        //console.log("Clean JSON data:", cleanJsondata);
        return cleanJsondata;
    } catch (error) {
        console.error("Ollama failure:", error.response?.data || error.message);
        throw error;
    }
}

// const response = await axios.post(`${process.env.OLLAMA_API_URL}/chat`,{
    //     model : "llama3",
        // messages: [
        //         { role: "system", content: "You are a precise financial data parser. Output ONLY valid JSON." },
        //         { role: "user", content: categoryPrompt }
        //     ],
        
    //     options: {
    //             temperature: 0,      // Forces deterministic answers (essential for finance)
    //             num_predict: 2048,   // Limits output to save compute
    //             format: "json",      // Native Ollama JSON enforcement
    //         },
    //         keep_alive: "1h"         // Keeps model in VRAM for 1 hour to avoid reload lag
    //     }, {
    //         headers: { "Content-Type": "application/json" },
    //         timeout: 60000,          // Reduced to 60s for responsiveness
    //     });