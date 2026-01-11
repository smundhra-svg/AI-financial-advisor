import {PDFParse} from "pdf-parse";

export const parsePDF = async(buffer: Uint8Array) => {
    // Parse the PDF buffer and return the text content
    const parser = new PDFParse(buffer);
    const data = await parser.getText();
    console.log(data.text);
    const lines = data.text.split(`\n`);
    const transactions: any[] = [];
    
    // Parsing logic to get the transaction data from the lines
    for(const line of lines){
        const match = line.match(
            /(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/
        );
        // If the line doesnt match the expected format, skip it
        if(!match) continue;

        // skip the full match at index 0 and take the capture groups
        const [,date, narration, withdrawal, deposit, balance] = match;
        const narrationText = (narration ?? '').trim();

        transactions.push({
            txnDate: date,
            narration: narrationText,
            debit: withdrawal ? Number(withdrawal.replace(/,/g, '')) : null,
            credit: deposit ? Number(deposit.replace(/,/g, '')) : null,
            balance: Number((balance ?? '0').replace(/,/g, '')),
            source: "pdf",
        });
    }
    return transactions;
 }