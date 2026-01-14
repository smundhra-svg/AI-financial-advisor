export const buildCategoryAnalysisPrompt = (transactions: any[]) => {
  return `[INST] You are a Financial Parser.
Task: Map transactions to categories and types.

Categories: Salary, Food & Dining, Rent, Utilities, Entertainment, Shopping, Travel, Health & Fitness, Education, Others.
Logic: 
- Type: "income" if credit; "expense" if debit.
- Output: Replace description with Category.

Data:
${JSON.stringify(transactions)}

Return ONLY a JSON object:
{
  "categorizedTransactions": [
    { "txnDate": "string", "category": "string", "amount": number, "type": "income|expense" }
  ]
}
[/INST]`;
};