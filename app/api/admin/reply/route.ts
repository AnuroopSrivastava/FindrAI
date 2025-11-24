import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, replySubject, replyBody, to } = body;

    if (!to || !replyBody) {
      return NextResponse.json(
        { error: "Missing to or replyBody" },
        { status: 400 }
      );
    }

    // Mark message as read
    if (id) {
      await ContactMessage.findByIdAndUpdate(id, { $set: { read: true } });
    }

    // Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FindrAI Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject: replySubject || "Reply from FindrAI",
      html: `
        <div style="font-family: Arial; color:#333; padding:16px;">
          <h2 style="color:#0ea5e9;">Reply from FindrAI</h2>
          <p>${replyBody.replace(/\n/g, "<br/>")}</p>
          <hr/>
          <small>This message was sent by the FindrAI Admin.</small>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending reply:", error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}
