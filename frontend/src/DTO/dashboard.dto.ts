export interface CategoriesTransactions{
    txnDate: string,
    category: string,
    amount: number,
    type: "income" | "expense"
}

export interface Summary{
    totalIncome: number,
    totalExpense: number,
    categories: Record<string,number>
    netSavings: number
}

export interface DashBoardData{
    categories: CategoriesTransactions[],
    summary: Summary,
    insights: string
}

