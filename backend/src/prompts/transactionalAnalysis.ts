export const buildTransactionalAnalysisPrompt = (transactions: any[], summary: any) => {
    return `You are a financial analyst. Categorize these bank transactions and provide a summary.

Transactions:
${JSON.stringify(transactions, null, 2)}
Computed Summary:
${JSON.stringify(summary)}

Rules:
1. Categorize each transaction into one of: "Food & Dining", "Utilities", "Entertainment", "Shopping", "Salary", "Travel", "Health & Fitness", "Education", "Others"
2. Determine if each transaction is "income" or "expense" based on debit/credit
3. Credits or transactions with credit amounts are income
4. Debits or transactions with debit amounts are expenses
5. Calculate totals for each category
6. Make sure the final summary matches the computed summary

Note: The computed summary is the ground truth. Ensure your calculations align with it.

Respond ONLY with a JSON object in this exact format (no markdown, no preamble):
{
  "summary": {
    "totalIncome": number,
    "totalExpense": number,
    "netSavings": number,
    "categoriesTotal": {
      "Food & Dining": number,
      "Utilities": number,
      "Entertainment": number,
      "Shopping": number,
      "Travel": number,
      "Health & Fitness": number,
      "Education": number,
      "Others": number
    }
  }
}`;
};