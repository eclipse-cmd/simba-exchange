import mongoose from "mongoose";
import { randomString } from "../_util";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    sender_id: { type: String, default: null },
    receiver_id: { type: String, required: true },
    amount: { type: String, required: true },
    type: { type: String, enum: ["1", "-1"], required: true },
    source_currency: { type: String, enum: ['USD', 'EURO', 'NGN'], required: true },
    target_currency: { type: String, enum: ['USD', 'EURO', 'NGN'], required: true },
    refrence: { type: String, required: true },
    exchange_rate: { type: String, default: null },
    description: { type: String, default: null },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

// Compile model from schema
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;