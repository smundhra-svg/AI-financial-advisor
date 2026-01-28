import { txnModel } from "../models/txnModel.ts";

export class txnRepo {
    static async findExistingHashes(userId: string, hashes: string[]): Promise<Set<string>>{
        const docs = await txnModel.find({
            userId,
            txnHash: {$in: hashes},
        },
        {txnHash: 1}
        ).lean();
        return new Set(docs.map(doc => doc.txnHash));
    }

    static async insertManyTxns(records: any[]){
        if(records.length === 0) return [];
        return await txnModel.insertMany(records,{ordered: false});
    }

    static async getAllForUser(userId: string) {
    return txnModel.find(
      { userId },
      { _id: 0, txnDate: 1, category: 1, amount: 1, type: 1 }
    ).lean();
  }
}