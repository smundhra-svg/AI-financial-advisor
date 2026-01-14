// export const calculateSummary = (transactions: any[])=> {
//     let totalIncome = 0
//     let totalExpense = 0 
//     for(const txn of transactions){
//         if(txn.amount > 0 && txn.type === "expense"){
//             totalExpense += txn.amount;
//         }
//         if(txn.amount > 0 && txn.type === "income"){
//             totalIncome += txn.amount;
//         }
//     }
//     console.log(`Total Income: ${totalIncome}, Total Expense: ${totalExpense}`);
//     console.log(`Net Savings: ${totalIncome - totalExpense}`);
//     return{
//         totalIncome,
//         totalExpense,
//         netSavings: totalIncome - totalExpense
//     };
// };

export const calculateSummary = (transactions: any[]) => {
  const summary = transactions.reduce((acc, txn) => {
    // 1. Handle Totals
    if (txn.type === "income") {
      acc.totalIncome += txn.amount;
    } else if (txn.type === "expense") {
      acc.totalExpense += txn.amount;

      // 2. Handle Category Totals (Nested inside expense)
      // Check if category exists, if not initialize it
      if (!acc.categories[txn.category]) {
        acc.categories[txn.category] = 0;
      }
      acc.categories[txn.category] += txn.amount;
    }

    return acc;
  }, {
    totalIncome: 0,
    totalExpense: 0,
    categories: {} // This will look like: {"Rent": 18000, "Food": 805, ...}
  });

  // 3. Finalize Net Savings
  return {
    ...summary,
    netSavings: summary.totalIncome - summary.totalExpense
  };
};