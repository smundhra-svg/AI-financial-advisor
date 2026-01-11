import csv from "csv-parser";
import { validateDate } from "../utils/validateDate.ts";
import { Readable } from "stream";

// export const parseCSV = async (buffer: Buffer) => {
//     // Array to store each rows transaction data
//     const results: any[] = [];
//     // Create a readable stream from the buffer
//     const stream = Readable.from(buffer.toString());
//     // Return a promise that resolves when parsing is complete
//     // Streams are event-based, so we use a promise to handle async flow
//     return new Promise<any[]>((resolve,reject)=> {
//         stream.pipe(csv())
//               .on("data",(row)=>{
                
//                 results.push({
//                     txnDate: row['DATE'],
//                     narration: row['NARRATION'],
//                     debit: row["WITHDRAWAL (DR)"] ? Number(row["WITHDRAWAL (DR)"]) : null,
//                     credit: row["DEPOSIT (CR)"] ? Number(row["DEPOSIT (CR)"]) : null,
//                     balance: Number(row["BALANCE"]),
//                     source: "csv",
//                 });
//               })
//               .on("end",()=> resolve(results))
//               .on("error",(error)=> reject(error));        
//     });
// };

export const parseCSV = async (buffer: Buffer) => {
  const results: any[] = [];
  const stream = Readable.from(buffer.toString());

   // Flag to indicate if we are in the transaction section
  let isTransactionSection = false;

  return new Promise<any[]>((resolve, reject) => {
    stream
      .pipe(
        csv({
          headers: ["date", "description", "debit", "credit", "balance"],
          skipLines: 0,
          strict: false,
        })
      )
      .on("data", (row) => {
        // Detect the actual header row
        if (
          row.date?.toLowerCase().includes("date") &&
          row.description?.toLowerCase().includes("descr")
        ) {
          isTransactionSection = true;
          return; // skip header row itself
        }

        if (!isTransactionSection) return;

        // Validate transaction rows
        if (!validateDate(row.date)) return;

        const debit = parseFloat(
          (row.debit || "").replace(/[$,\s]/g, "")
        );
        const credit = parseFloat(
          (row.credit || "").replace(/[$,\s]/g, "")
        );
        const balance = parseFloat(
          (row.balance || "").replace(/[$,\s]/g, "")
        );

        results.push({
          txnDate: row.date,
          narration: row.description?.trim() || null,
          debit: isNaN(debit) ? null : debit,
          credit: isNaN(credit) ? null : credit,
          balance: isNaN(balance) ? null : balance,
          source: "csv",
        });
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

