import {Schema,model} from "mongoose";

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
  },
  { timestamps: true },
);

txnSchema.index({userId: 1, txnHash: 1}, {unique: true});

export const txnModel = model("Transaction",txnSchema);
