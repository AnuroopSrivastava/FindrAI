import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(50, parseInt(url.searchParams.get("limit") || "10", 10)));
    const skip = (page - 1) * limit;

    const [messages, total, unreadCount] = await Promise.all([
      ContactMessage.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
    ]);

    return NextResponse.json({
      messages,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        unreadCount,
      },
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
