import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") || "";
  const rec = await prisma.cvRequest.findUnique({ where: { token } });
  if (!rec)
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  if (!rec.verified)
    await prisma.cvRequest.update({
      where: { token },
      data: { verified: true },
    });
  return NextResponse.json({ ok: true, status: "verified" });
}
