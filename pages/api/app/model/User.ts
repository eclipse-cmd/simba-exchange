import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, select: false },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

// Compile model from schema

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
