export const calculateSummary = (transactions: any[])=> {
    let totalIncome = 0
    let totalExpense = 0 
    for(const txn of transactions){
        if(txn.amount > 0) totalIncome += txn.amount;
        else totalExpense += Math.abs(txn.amount);
    }
    return{
        totalIncome,
        totalExpense,
        netSavings: totalIncome - totalExpense
    };
};