import { buildTransactionalAnalysisPrompt } from "../prompts/transactionalAnalysis.ts";
import { buildCategoryAnalysisPrompt } from "../prompts/categoryStreamline.ts";
import ollama from 'ollama';
import { systemPrompt } from "../prompts/systemPrompt.ts";
import { getCategories } from "../prompts/getCategoryPrompt.ts";
import { ProcessedTransaction, Transaction } from "../store/transactions.store.ts";

// Utility to handle JSON parsing safely
const cleanJson = (raw: string) => {
    try {
        // Find the first '{' and last '}' to strip any AI preamble or backticks
        const jsonStart = raw.indexOf('{');
        const jsonEnd = raw.lastIndexOf('}') + 1;
        return JSON.parse(raw.slice(jsonStart, jsonEnd));
    } catch (e) {
        throw new Error("AI returned invalid JSON: " + raw);
    }
};
export const generateAITransactions = async (transactions: Transaction[]): Promise<ProcessedTransaction[]> => {
    // const prompt = buildTransactionalAnalysisPrompt(transactions,summary);
    // const categoryPrompt = buildCategoryAnalysisPrompt(transactions);
    const categoryPrompt = getCategories(transactions);
    
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
        // const rawContent = response.message.content;
        // const cleanJsondata = cleanJson(rawContent);
        // //console.log("Clean JSON data:", cleanJsondata);
        // return cleanJsondata;
        const {categories}: {categories: string[]} = JSON.parse(response.message.content);

        const processedTransactions = transactions.map((tx, index) => {
            return { 
                txnDate: tx.txnDate,
                category: categories[index],
                amount: tx.credit || tx.debit,
                type: (tx.credit && tx.credit > 0) ? 'income' : 'expense' 
            } satisfies ProcessedTransaction;
        });

        return processedTransactions;
    } catch (error) {
        console.error("Ollama failure:", error.response?.data || error.message);
        throw error;
    }
}
