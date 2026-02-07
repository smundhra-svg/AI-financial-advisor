import { trace } from "node:console";
import { parseCSV } from "./csvParser.service.ts";
import { parsePDF } from "./pdfParser.service.ts";
import { setTransactions } from "../store/transactions.store.ts";
import {v4 as uuidv4} from "uuid";

export const processFile = async (file: Express.Multer.File) => {
    let transactions: any[] = [];
    if(file.mimetype === 'text/csv'){
        transactions = await parseCSV(file.buffer);
    }else{
        const unit8array = new Uint8Array(file.buffer);
        transactions = await parsePDF(unit8array); 
    }
    
    //Adding tempId to the transactions for Dart/review system.
    transactions = transactions.map(txn=> ({...txn, tempId: uuidv4()}));
    setTransactions(transactions)
    return transactions.length;
}