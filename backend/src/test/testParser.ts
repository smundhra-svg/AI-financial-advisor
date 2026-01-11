import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCSV } from '../services/csvParser.service.ts';
import { parsePDF } from '../services/pdfParser.service.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCSVParser() {
  console.log('Starting CSV Parser Test...');

  const csvPath = path.join(
    __dirname,
    '../../samples/sample_test.csv'
  );

  const csvBuffer = fs.readFileSync(csvPath);

  const result = await parseCSV(csvBuffer);
  console.log('CSV Parser Test Result:', result);

  console.log("\n---- PDF TEST ----");

  const pdfBuffer = fs.readFileSync(
    path.join(__dirname, "../../samples/sample.pdf")
  );
  const unit8array = new Uint8Array(pdfBuffer);
  const pdfResult = await parsePDF(unit8array);
  console.log("Results for pdf:",pdfResult);
}

testCSVParser().catch(console.error);
