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
  txnDate: string,
  description: string,
  category: string,
  amount: number,
  type: 'income' | 'expense',
  tempId: string, // Temporary ID for review system
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
