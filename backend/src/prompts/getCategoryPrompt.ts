import { extractDescription } from "../services/extractDescription.ts"

export const getCategories = (transactions: any[])=> {
return `[INST] You are a Smart Financial Parser.
Task: Map each transaction's description to one specific category from the following list ONLY.

Categories: Salary, Food & Dining, Rent, Utilities, Entertainment, Shopping, Travel, Health & Fitness, Education, Others.

Logic:
1. NEVER use: "undefined", "null", "empty string", or any value not in the list above
2. If unsure about a transaction, use "Others" (not "undefined")
3. Minimize "Others" usage by making best-effort guesses- You must categorize each transaction with the exact category, try to keep the number of "Others" category as low as possible.
- Output: Provide a JSON object with "categories" as a string array of category of transaction in order of input based on above. Array length should be same as input length.
Data:
${JSON.stringify(extractDescription(transactions))}
`
}

// export const getCategories = (transactions: any[])=> {
// return `[INST] You are a Smart Financial Parser.
// Task: Map each transaction's description to one specific category from the following list ONLY.

// Categories: Salary, Food & Dining, Rent, Utilities, Entertainment, Shopping, Travel, Health & Fitness, Education, Others.

// Logic:
// - Return an array of categories as one-to-one mapping to each transaction description.
// - If any description does not match the above list, categorize it as "Others".
// - Output: Provide an array of categories based on above.
// Data:
// ${JSON.stringify(extractDescription(transactions))}
// `
// }