import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { toSlug } from "@/lib/slug";

export async function GET() {
  const data = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(data);
}
export async function POST(req: Request) {
  const b = await req.json();
  const created = await prisma.post.create({
    data: {
      title: b.title,
      slug: toSlug(b.title),
      excerpt: b.excerpt ?? "",
      content: b.content ?? "",
      authorId: b.authorId,
      tags: b.tags ?? [],
      publishedAt: b.publishedAt || null,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
