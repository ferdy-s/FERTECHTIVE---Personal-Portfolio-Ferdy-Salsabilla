import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = await prisma.post.findUnique({ where: { id: params.id } });
  return data
    ? NextResponse.json(data)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const b = await req.json();
  const updated = await prisma.post.update({
    where: { id: params.id },
    data: b,
  });
  return NextResponse.json(updated);
}
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
