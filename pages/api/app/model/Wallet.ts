import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    owner_id: { type: String },
    amount: { type: String, default: "0" },
    type: { type: String, enum: ['USD', 'EURO', 'NGN'] },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

// Compile model from schema
const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);

export default Wallet;
