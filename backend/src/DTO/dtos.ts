export interface RecordsDatabase{
    userId: string
    txnHash: string
    txnDate: Date
    description: string
    category: string
    amount: number
    type: "income" | "expense"
    tempId: string
}

export interface RecordsParsedFromRedis{
    status: "EDITED"
    transactions: RecordsDatabase[] | []
}