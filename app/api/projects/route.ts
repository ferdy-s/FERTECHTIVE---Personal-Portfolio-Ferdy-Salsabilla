import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { toSlug } from "@/lib/slug";

export async function GET() {
  const data = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}
export async function POST(req: Request) {
  const b = await req.json();
  const created = await prisma.project.create({
    data: {
      title: b.title,
      slug: toSlug(b.title),
      description: b.description ?? "",
      content: b.content ?? "",
      images: b.images ?? [],
      tags: b.tags ?? [],
      published: !!b.published,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
