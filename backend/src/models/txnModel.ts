import {Schema,model} from "mongoose";
import { RecordsDatabase } from "../DTO/dtos.ts";

const txnSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    txnHash: {
        type: String,
        required: true,
        index: true,
    },
    txnDate:{
        type: Date,
        required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    tempId:{
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

txnSchema.index({userId: 1, txnHash: 1}, {unique: true});

export const txnModel = model("Transaction",txnSchema);
