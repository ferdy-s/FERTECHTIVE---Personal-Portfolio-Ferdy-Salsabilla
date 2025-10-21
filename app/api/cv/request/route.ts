import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import crypto from "node:crypto";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "ip") + ":cv";
  if (!rateLimit(ip))
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const { email, source, company, fullName, phone, message } = await req.json();
  if (!email || !fullName)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const token = crypto.randomBytes(24).toString("hex");
  await prisma.cvRequest.create({
    data: { email, source, company, fullName, phone, message, token },
  });
  await sendVerificationEmail(email, token);
  return NextResponse.json({ ok: true });
}
