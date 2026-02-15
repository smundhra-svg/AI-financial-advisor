export interface CategoriesTransactions{
    txnDate: string,
    description: string,
    category: string,
    amount: number,
    type: "income" | "expense",
    tempId: string
}

export interface ReviewData{
    status: "DRAFT",
    transactions: CategoriesTransactions[]
}

export interface Summary{
    totalIncome: number,
    totalExpense: number,
    categories: Record<string,number>
    netSavings: number
}

export interface DashBoardData{
    data: CategoriesTransactions[],
    summary: Summary,
    insights: string
}

export interface UpdateCategoryRequest{
    tempId: string,
    category: string
}

