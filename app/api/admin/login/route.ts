// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, generateHash } = body as {
      email?: string;
      password?: string;
      generateHash?: boolean;
    };

    // -----------------------------------------
    // 🔥 FEATURE: Generate ADMIN_PASSWORD_HASH
    // -----------------------------------------
    if (generateHash) {
      if (!password) {
        return NextResponse.json(
          { error: "Password required for hash generation" },
          { status: 400 }
        );
      }

      const hash = await bcrypt.hash(password, 10);

      return NextResponse.json({
        success: true,
        hash,
        message:
          "Use this hash in Vercel → Environment Variables → ADMIN_PASSWORD_HASH",
      });
    }

    // -----------------------------------------
    // 🔐 Normal Admin Login
    // -----------------------------------------
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
      return NextResponse.json(
        { error: "Admin credentials not configured" },
        { status: 500 }
      );
    }

    if (email !== adminEmail) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, adminHash);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.warn(
        "⚠️ WARNING: JWT_SECRET missing — insecure token will be generated."
      );
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "6h" }
    );

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
