"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

// ========= Helpers =========
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseKeywords(input: string | null | undefined): string[] {
  if (!input) return [];
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function saveFile(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".bin";
  const filename = `${Date.now()}-${randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(path.join(uploadDir, filename), bytes);
  return `/uploads/${filename}`;
}

/** Cari authorId cadangan bila tidak dikirim */
async function resolveAuthorId(explicitAuthorId?: string): Promise<string> {
  if (explicitAuthorId) return explicitAuthorId;
  const anyUser = await prisma.user.findFirst({ select: { id: true } });
  if (!anyUser) {
    throw new Error(
      "Author wajib diisi. Tidak ditemukan user mana pun di database. Buat minimal 1 user dulu atau kirimkan authorId saat upsertPost."
    );
  }
  return anyUser.id;
}

/**
 * Pastikan slug unik.
 * - Basis: `base` (mis. "apa-itu-coding")
 * - Jika sudah ada dan bukan milik `excludeId`, tambahkan suffix angka: -2, -3, ...
 */
async function ensureUniqueSlug(
  base: string,
  excludeId?: string
): Promise<string> {
  const rawBase = slugify(base);
  // Ambil semua slug yang diawali rawBase (untuk menghitung suffix berikutnya)
  const existing = await prisma.post.findMany({
    where: {
      slug: { startsWith: rawBase },
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { slug: true },
  });

  if (existing.length === 0) return rawBase;

  // Kumpulkan suffix angka tertinggi
  let maxN = 1;
  for (const { slug } of existing) {
    if (slug === rawBase) {
      maxN = Math.max(maxN, 1);
    } else {
      const m = slug.match(new RegExp(`^${rawBase}-(\\d+)$`));
      if (m) {
        const n = parseInt(m[1], 10);
        if (!Number.isNaN(n)) maxN = Math.max(maxN, n);
      }
    }
  }
  return `${rawBase}-${maxN + 1}`;
}

// ========= Category Actions =========
export async function createCategory(data: { name: string }) {
  const name = data.name?.trim();
  if (!name) throw new Error("Nama kategori wajib diisi.");
  const slug = await ensureUniqueSlug(name); // aman jika slug kategori juga unik
  const cat = await prisma.category.create({ data: { name, slug } });
  revalidatePath("/admin/posts");
  return cat;
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/posts");
  return { ok: true };
}

// ========= Post Actions =========
type UpsertPostInput = {
  id?: string;
  title: string;
  excerpt?: string;
  contentHtml: string;
  coverUrl?: string | null;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string; // comma separated
  categoryIds?: string[];
  published?: boolean;
  publishedAt?: Date | null;
  slug?: string;
  authorId?: string;
};

export async function upsertPost(input: UpsertPostInput) {
  const {
    id,
    title,
    excerpt,
    contentHtml,
    coverUrl,
    metaTitle,
    metaDescription,
    metaKeywords,
    categoryIds = [],
    published = false,
    publishedAt,
    slug,
    authorId,
  } = input;

  if (!title?.trim()) throw new Error("Judul wajib diisi.");

  // hitung slug final yang unik (perhatikan UPDATE vs CREATE)
  const requested = (slug?.trim() || slugify(title)).toLowerCase();
  const finalSlug = await ensureUniqueSlug(requested, id);

  const baseData = {
    title: title.trim(),
    excerpt: excerpt?.trim() ?? "",
    content: contentHtml,
    coverUrl: coverUrl ?? null,
    slug: finalSlug,
    metaTitle: (metaTitle ?? "").trim() || title.trim(),
    metaDescription: (metaDescription ?? "").trim(),
    metaKeywords: parseKeywords(metaKeywords),
    publishedAt: published ? (publishedAt ?? new Date()) : null,
  };

  let post;
  if (id) {
    // UPDATE
    post = await prisma.post.update({
      where: { id },
      data: {
        ...baseData,
        categories: {
          set: [],
          connect: categoryIds.map((cid) => ({ id: cid })),
        },
      },
      include: { categories: true },
    });
  } else {
    // CREATE
    const finalAuthorId = await resolveAuthorId(authorId);
    try {
      post = await prisma.post.create({
        data: {
          ...baseData,
          authorId: finalAuthorId,
          categories: {
            connect: categoryIds.map((cid) => ({ id: cid })),
          },
        },
        include: { categories: true },
      });
    } catch (err: any) {
      // Guard tambahan jika terjadi race condition (P2002)
      if (err?.code === "P2002" && err?.meta?.target?.includes("slug")) {
        const retrySlug = await ensureUniqueSlug(finalSlug);
        post = await prisma.post.create({
          data: {
            ...baseData,
            slug: retrySlug,
            authorId: finalAuthorId,
            categories: { connect: categoryIds.map((cid) => ({ id: cid })) },
          },
          include: { categories: true },
        });
      } else {
        throw err;
      }
    }
  }

  revalidatePath("/admin/posts");
  revalidatePath(`/blog/${post.slug}`);
  return post;
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  return { ok: true };
}

// ========= Upload =========
export async function uploadImage(formData: FormData) {
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("File tidak ditemukan.");
  const url = await saveFile(file);
  return { url };
}
