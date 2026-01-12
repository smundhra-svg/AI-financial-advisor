import { trace } from "node:console";
import { parseCSV } from "./csvParser.service.ts";
import { parsePDF } from "./pdfParser.service.ts";
import { setTransactions } from "../store/transactions.store.ts";

export const processFile = async (file: Express.Multer.File) => {
    let transactions: any[] = [];
    if(file.mimetype === 'text/csv'){
        transactions = await parseCSV(file.buffer);
    }else{
        const unit8array = new Uint8Array(file.buffer);
        transactions = await parsePDF(unit8array); 
    }
    // Later add the transactions to DB
    setTransactions(transactions)
    return transactions.length;
}