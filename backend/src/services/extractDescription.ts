export const extractDescription = (transactions: any[])=> {
    const descriptions = []
    for(const txn of transactions){
        descriptions.push(txn.description);
    }
    return descriptions;
}