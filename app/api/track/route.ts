import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { type, slug } = await req.json();
    if (!type || !slug) return new Response("Bad request", { status: 400 });

    // Jika model ViewEvent belum ada, ini akan no-op
    const client: any = prisma as any;
    if (client.viewEvent?.create) {
      await client.viewEvent.create({ data: { type, slug } });
    }
    return new Response("ok");
  } catch (e) {
    return new Response("ok"); // jangan ganggu UX jika tracking gagal
  }
}
