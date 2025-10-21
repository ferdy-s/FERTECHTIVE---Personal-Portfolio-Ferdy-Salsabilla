import { prisma } from "@/lib/prisma";
import {
  createCategory,
  deleteCategory,
  deletePost,
  upsertPost,
  uploadImage,
} from "./actions";
import Editor from "./ui";
import { cookies } from "next/headers";
import type { Prisma, Category as CategoryModel } from "@prisma/client";

/* ===== Types ===== */
type PostWithRels = Prisma.PostGetPayload<{
  include: { categories: true; author: true };
}>;

/* ===== Utils ===== */
function fmtDate(d?: string | Date | null) {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function toISO(d?: string | Date | null) {
  if (!d) return undefined;
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString();
}

export default async function AdminPostsPage() {
  // (opsional) protection sederhana: pastikan sudah login di layer lain
  void cookies();

  const [posts, categories] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { categories: true, author: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const publishedCount = posts.filter((p) => p.publishedAt).length;

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 py-10 text-white">
      {/* ===== Dashboard Head ===== */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Blog CMS</h1>
        <p className="opacity-70 mt-1">
          Dashboard profesional: kelola posting, kategori, SEO, & media.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="Total Post" value={posts.length} />
          <Stat label="Dipublish" value={publishedCount} />
          <Stat label="Kategori" value={categories.length} />
        </div>
      </header>

      {/* ===== Actions Bar ===== */}
      <section
        aria-label="Aksi cepat"
        className="mb-8 flex flex-wrap items-center gap-3"
      >
        <NewPostDialog categories={categories} />
        <NewCategoryForm />
      </section>

      {/* ===== Posts Table ===== */}
      <section
        aria-label="Daftar posting"
        className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
      >
        <div className="px-5 py-3 text-sm opacity-70 border-b border-white/10 flex items-center justify-between">
          <span>Daftar Post</span>
          <span className="text-white/50">
            {publishedCount} / {posts.length} dipublish
          </span>
        </div>

        <div className="divide-y divide-white/10">
          {posts.map((p: PostWithRels) => (
            <PostRow
              key={p.id}
              post={p}
              categories={categories.map((c) => ({ id: c.id, name: c.name }))}
            />
          ))}

          {posts.length === 0 && (
            <div className="px-5 py-12 text-center opacity-60 text-sm">
              Belum ada konten. Buat post baru untuk memulai.
            </div>
          )}
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Kategori</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c: CategoryModel) => (
            <form
              key={c.id}
              action={async () => {
                "use server";
                await deleteCategory(c.id);
              }}
              className="inline-flex"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                {c.name}
                <button
                  type="submit"
                  className="opacity-60 hover:opacity-100"
                  title={`Hapus kategori ${c.name}`}
                  aria-label={`Hapus kategori ${c.name}`}
                >
                  ×
                </button>
              </span>
            </form>
          ))}

          {categories.length === 0 && (
            <span className="text-sm opacity-60">Belum ada kategori.</span>
          )}
        </div>
      </section>
    </main>
  );
}

/* ===== Small UI Bits ===== */
function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

/* ===== New Category ===== */
function NewCategoryForm() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const name = String(formData.get("name") || "").trim();
        if (!name) return;
        await createCategory({ name });
      }}
      className="flex items-center gap-2"
      aria-label="Tambah kategori"
    >
      <input
        name="name"
        placeholder="Tambah kategori…"
        className="rounded-xl bg-white/10 px-3 py-2 text-sm outline-none placeholder-white/50"
        aria-label="Nama kategori"
      />
      <button
        type="submit"
        className="rounded-xl bg-white/20 px-3 py-2 text-sm hover:bg-white/30"
      >
        Tambah
      </button>
    </form>
  );
}

/* ===== Row with inline Edit dialog ===== */
function PostRow({
  post,
  categories,
}: {
  post: PostWithRels;
  categories: { id: string; name: string }[];
}) {
  const iso = toISO(post.publishedAt);
  const pubLabel = post.publishedAt ? fmtDate(post.publishedAt) : "Draft";

  return (
    <div className="px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{post.title}</div>
        <div className="text-xs opacity-60 flex flex-wrap gap-2">
          <span>{post.author?.name ?? "—"}</span>
          <span aria-hidden>•</span>
          {post.publishedAt ? (
            <time dateTime={iso}>{pubLabel}</time>
          ) : (
            <span>{pubLabel}</span>
          )}
        </div>
        <div className="mt-1 text-xs opacity-80 flex flex-wrap gap-2">
          {post.categories.length ? (
            post.categories.map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-[2px]"
              >
                {c.name}
              </span>
            ))
          ) : (
            <span className="opacity-60">—</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <EditPostDialog post={post} categories={categories} />
        <form
          action={async () => {
            "use server";
            await deletePost(post.id);
          }}
        >
          <button
            className="rounded-xl bg-red-500/20 hover:bg-red-500/30 px-3 py-2 text-sm"
            title={`Hapus "${post.title}"`}
            aria-label={`Hapus ${post.title}`}
          >
            Hapus
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===== Dialogs (details/summary) ===== */
function NewPostDialog({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  return (
    <details className="group">
      <summary className="cursor-pointer rounded-xl bg-white/20 px-4 py-2 text-sm hover:bg-white/30">
        + Post Baru
      </summary>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <PostForm categories={categories} />
      </div>
    </details>
  );
}

function EditPostDialog({
  post,
  categories,
}: {
  post: PostWithRels;
  categories: { id: string; name: string }[];
}) {
  return (
    <details className="group">
      <summary className="cursor-pointer rounded-xl bg-white/20 px-3 py-2 text-sm hover:bg-white/30">
        Edit
      </summary>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <PostForm post={post} categories={categories} />
      </div>
    </details>
  );
}

/* ===== Post Form with Editor ===== */
function PostForm({
  post,
  categories,
}: {
  post?: PostWithRels;
  categories: { id: string; name: string }[];
}) {
  async function action(formData: FormData) {
    "use server";
    const get = (k: string) => String(formData.get(k) || "");
    const categoryIds = formData.getAll("categoryIds").map(String);

    const published = get("published") === "on";
    let coverUrl = get("coverUrl");

    // Ambil file dari input name="file" lalu kirim ke uploadImage
    const rawFile = formData.get("file");
    if (rawFile instanceof File && rawFile.size > 0) {
      const fd = new FormData();
      fd.set("file", rawFile);
      const res = await uploadImage(fd);
      coverUrl = res.url;
    }

    await upsertPost({
      id: get("id") || undefined,
      title: get("title"),
      excerpt: get("excerpt"),
      contentHtml: get("contentHtml"),
      coverUrl: coverUrl || undefined,
      metaTitle: get("metaTitle"),
      metaDescription: get("metaDescription"),
      metaKeywords: get("metaKeywords"),
      categoryIds,
      published,
      slug: get("slug"),
    });
  }

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="id" defaultValue={post?.id} />

      <div className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span className="text-sm opacity-70">Judul</span>
          <input
            name="title"
            defaultValue={post?.title}
            className="rounded-xl bg-white/10 px-3 py-2 outline-none"
            placeholder="Judul artikel"
            required
            aria-required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm opacity-70">Slug (opsional)</span>
          <input
            name="slug"
            defaultValue={post?.slug}
            className="rounded-xl bg-white/10 px-3 py-2 outline-none"
            placeholder="otomatis dari judul"
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm opacity-70">Excerpt / Ringkasan</span>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={3}
          className="rounded-xl bg-white/10 px-3 py-2 outline-none"
        />
      </label>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span className="text-sm opacity-70">Meta Title</span>
          <input
            name="metaTitle"
            defaultValue={post?.metaTitle ?? post?.title ?? ""}
            className="rounded-xl bg-white/10 px-3 py-2 outline-none"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm opacity-70">Meta Keywords (comma)</span>
          <input
            name="metaKeywords"
            defaultValue={
              Array.isArray((post as any)?.metaKeywords)
                ? (post as any).metaKeywords.join(", ")
                : ((post as any)?.metaKeywords ?? "")
            }
            className="rounded-xl bg-white/10 px-3 py-2 outline-none"
            placeholder="web dev, nextjs, prisma"
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm opacity-70">Meta Description</span>
        <textarea
          name="metaDescription"
          defaultValue={(post as any)?.metaDescription ?? ""}
          rows={2}
          className="rounded-xl bg-white/10 px-3 py-2 outline-none"
        />
      </label>

      {/* Cover */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span className="text-sm opacity-70">Cover URL</span>
          <input
            name="coverUrl"
            defaultValue={(post as any)?.coverUrl ?? ""}
            className="rounded-xl bg-white/10 px-3 py-2 outline-none"
            placeholder="/uploads/cover.jpg"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm opacity-70">atau Upload Cover</span>
          <input
            type="file"
            name="file" // dipakai oleh uploadImage
            className="rounded-xl bg-white/10 px-3 py-2 file:mr-2 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1"
            aria-label="Upload cover"
          />
        </label>
      </div>

      {/* Categories */}
      <fieldset className="grid gap-2">
        <legend className="text-sm opacity-70">Kategori</legend>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => {
            const checked = post?.categories?.some((x) => x.id === c.id);
            return (
              <label
                key={c.id}
                className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-2 py-1 border border-white/10"
              >
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={c.id}
                  defaultChecked={!!checked}
                />
                <span className="text-sm">{c.name}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Editor */}
      <Editor
        name="contentHtml"
        defaultValue={post?.content ?? ""}
        uploadAction={uploadImage}
      />

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={!!post?.publishedAt}
        />
        <span className="text-sm">Publish</span>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 px-4 py-2"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
