export const extractDescription = (transactions: any[])=> {
    const descriptions = []
    for(const txn of transactions){
        descriptions.push(txn.description);
    }
    console.log("extracted desc:", descriptions);
    return descriptions;
}