import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, read } = body;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { read: !!read },
      { new: true }
    ).lean();

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("Error marking read:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
