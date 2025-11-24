import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    // Save to DB
    await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send email
    await resend.emails.send({
      from: "Anuroop Srivastava <onboarding@resend.dev>",
      to: "anuroopkv2001@gmail.com",
      subject: `${subject} — From ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <br/>
        <p style="color:#0ea5e9;font-weight:600">Sent from FindrAI Contact Page</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling contact:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
