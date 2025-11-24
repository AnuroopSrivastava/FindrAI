import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, // NEW
  },
  { timestamps: true }
);

// Avoid model overwrite in Next.js dev
export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", MessageSchema);
