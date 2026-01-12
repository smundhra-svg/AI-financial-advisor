let transactions: any[] = [];

export const setTransactions = (data: any[]) => {
  transactions = data;
};

export const getTransactions = () => {
  return transactions;
};

export const clearTransactions = () => {
  transactions = [];
};
