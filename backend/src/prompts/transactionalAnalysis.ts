export const buildTransactionalAnalysisPrompt = (transactions: any[], summary: any) => {
    `You are a financial analyst. Categorize these bank transactions and provide a summary.

Transactions:
${JSON.stringify(transactions, null, 2)}
Computed Summary:
${JSON.stringify(summary)}

Rules:
1. Categorize each transaction into one of: "Food & Dining", "Utilities", "Entertainment", "Shopping", "Travel", "Health & Fitness", "Education", "Others"
2. Determine if each transaction is "income" or "expense" based on debit/credit
3. Credits or transactions with credit amounts are income
4. Debits or transactions with debit amounts are expenses
5. Calculate totals for each category
6. Calculate total income, total expense, and net savings

Respond ONLY with a JSON object in this exact format (no markdown, no preamble):
{
  "transactions": [
    {
      "txnDate": "string",
      "description": "string",
      "debit": number or null,
      "credit": number or null,
      "balance": number or null,
      "source": "string",
      "category": "string",
      "type": "income" or "expense"
    }
  ],
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