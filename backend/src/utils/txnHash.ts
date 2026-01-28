import crypto from 'crypto';

export const generateTxnHash = (
    txnDate: string,
    category: string,
    amount: number,
    type: string
) => {
    const raw = `${txnDate}|${category}|${amount}|${type}`;
    return crypto.createHash('sha256').update(raw).digest("hex");
};