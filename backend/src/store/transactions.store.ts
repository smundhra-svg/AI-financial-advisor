export interface Transaction{
  txnDate: string,
  description: string,
  debit: number | null,
  credit: number | null,
  balance: number,
  source: string,
  tempId: string,
}

export interface ProcessedTransaction{
  userId?: string;
    type: "income" | "expense";
    txnHash?: string;
    txnDate: string;
    category: string;
    amount: number;
    tempId: string;
    description?: string;
}

let transactions: Transaction[] = [];

export const setTransactions = (data: Transaction[]) => {
  transactions = data;
  console.log(transactions);
};

export const getTransactions = () => {
  return transactions;
};

export const clearTransactions = () => {
  transactions = [];
};
