import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin", "super-admin"],
  },
});

export const Admin = model("Admin", adminSchema);
