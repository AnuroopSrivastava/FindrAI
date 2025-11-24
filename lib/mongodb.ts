import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "findrai_db",   // 🔥 Force correct DB
    });

    isConnected = true;
    console.log("🚀 MongoDB Connected");
  } catch (err) {
    console.error("❌ DB ERROR:", err);
  }
};
