let transactions: any[] = [];

export const setTransactions = (data: any[]) => {
  transactions = data;
  console.log(transactions);
};

export const getTransactions = () => {
  return transactions;
};

export const clearTransactions = () => {
  transactions = [];
};
