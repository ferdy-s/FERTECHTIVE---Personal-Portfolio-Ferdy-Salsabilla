// app/admin/projects/page.tsx
import { prisma } from "@/lib/prisma";
import { deriveCategory } from "@/lib/categories";

import FilePicker from "./FilePicker";
import CategorySelect from "./CategorySelect";
import SlugField from "./SlugField";
import RichTextEditor from "./RichTextEditor";
import { upsertProject, deleteProject, togglePublish } from "./actions";

/* ========= Data ========= */
async function getData() {
  return prisma.project.findMany({ orderBy: { createdAt: "desc" } });
}

/* ========= Page ========= */
export default async function AdminProjectsPage() {
  const itemsRaw = await getData();

  // Tampilkan kategori: pakai yang tersimpan, kalau kosong derive dari metadata
  const items = itemsRaw.map((p) => {
    const tagsArr = Array.isArray(p.tags) ? (p.tags as string[]) : [];
    const derived = deriveCategory({
      tags: tagsArr,
      title: (p as any).title ?? "",
      description: (p as any).description ?? "",
    });
    return { ...p, categoryShown: (p as any).category ?? derived };
  });

  return (
    <div className="grid gap-6">
      {/* CREATE */}
      <form
        action={upsertProject}
        className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Create Project</div>
          <span className="text-xs opacity-70">Fields bertanda * wajib</span>
        </div>

        {/* Title + Slug */}
        <div className="grid gap-4 md:grid-cols-2">
          <Field name="title" label="Title" required />
          <SlugField basePath="/portfolio" />
        </div>

        {/* Category + Published */}
        <div className="grid gap-4 md:grid-cols-2">
          <CategorySelect required />
          <label className="inline-flex items-center gap-2 text-sm md:self-end">
            <input type="checkbox" name="published" className="h-4 w-4" />{" "}
            Published
          </label>
        </div>

        {/* Deskripsi singkat */}
        <Textarea name="description" label="Short Description" required />

        {/* Detail (Rich Text) */}
        <RichTextEditor name="content" label="Detail (Rich Text)" />

        {/* Tags + Images */}
        <Field
          name="tags"
          label="Tags"
          hint="comma / new lines (e.g. next.js, uiux)"
        />
        <FilePicker
          name="images"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          maxBytes={8 * 1024 * 1024}
          maxFiles={12}
        />

        {/* ===== SEO Section ===== */}
        <div className="mt-2 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="mb-2 text-sm font-semibold">SEO</div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              name="metaTitle"
              label="Meta Title"
              hint="Ideal 50–70 karakter"
            />
            <Field
              name="canonicalUrl"
              label="Canonical URL"
              hint="https://domainmu.com/portfolio/slug"
            />
          </div>

          <Textarea
            name="metaDescription"
            label="Meta Description"
            // hint handled via copy in small text below
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              name="metaKeywords"
              label="Meta Keywords"
              hint="Pisahkan dengan koma (opsional, untuk referensi internal)"
            />
            <Field
              name="ogImage"
              label="OG Image URL (1200×630)"
              hint="Kosongkan untuk pakai thumbnail"
            />
          </div>

          <p className="mt-2 text-xs opacity-70">
            • <strong>Meta Title</strong> &le; 70 char,{" "}
            <strong>Description</strong> &le; 160 char. <br />•{" "}
            <strong>Canonical</strong> disarankan berisi URL final halaman.{" "}
            <br />• <strong>OG Image</strong> akan dipakai untuk Open Graph &
            Twitter Card.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="reset"
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Reset
          </button>
          <button className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
            Save
          </button>
        </div>
      </form>

      {/* LIST */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.04]">
            <tr>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Category</Th>
              <Th>Published</Th>
              <Th>Tags</Th>
              <Th>Images</Th>
              <Th>SEO</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const thumb =
                (p as any).thumbnailUrl ??
                (Array.isArray((p as any).images)
                  ? (p as any).images[0]
                  : null);

              const seoTitle = (p as any).metaTitle as string | undefined;
              const seoDesc = (p as any).metaDescription as string | undefined;
              const og = (p as any).ogImage as string | undefined;

              return (
                <tr key={p.id} className="border-t border-white/10 align-top">
                  <Td className="font-medium">{(p as any).title}</Td>
                  <Td className="text-xs opacity-80">{(p as any).slug}</Td>
                  <Td className="text-xs opacity-80">
                    {(p as any).categoryShown ?? "—"}
                  </Td>

                  <Td>
                    <form
                      action={togglePublish.bind(
                        null,
                        p.id,
                        !(p as any).published
                      )}
                    >
                      <button className="rounded-full border border-white/10 px-3 py-1 text-xs hover:bg-white/10">
                        {(p as any).published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                  </Td>

                  <Td className="max-w-[240px] truncate">
                    {Array.isArray((p as any).tags)
                      ? (p as any).tags.join(", ")
                      : ""}
                  </Td>

                  <Td className="max-w-[320px]">
                    {thumb ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-6 w-10 overflow-hidden rounded bg-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={String(thumb)}
                            alt=""
                            className="h-6 w-10 object-cover"
                          />
                        </span>
                        <a
                          href={String(thumb)}
                          target="_blank"
                          className="truncate text-xs opacity-80 hover:underline"
                        >
                          {String(thumb)}
                        </a>
                      </div>
                    ) : (
                      <span className="opacity-60">—</span>
                    )}
                  </Td>

                  <Td className="min-w-[220px]">
                    <div className="space-y-1">
                      <div className="truncate">
                        <span className="opacity-60">Title:</span>{" "}
                        <span className="text-xs">
                          {seoTitle || <em className="opacity-60">—</em>}
                        </span>
                      </div>
                      <div className="truncate">
                        <span className="opacity-60">Desc:</span>{" "}
                        <span className="text-xs">
                          {seoDesc || <em className="opacity-60">—</em>}
                        </span>
                      </div>
                      <div className="truncate">
                        <span className="opacity-60">OG:</span>{" "}
                        {og ? (
                          <a
                            href={og}
                            target="_blank"
                            className="text-xs underline decoration-dotted"
                          >
                            {og}
                          </a>
                        ) : (
                          <span className="text-xs opacity-60">—</span>
                        )}
                      </div>
                    </div>
                  </Td>

                  <Td>
                    <form action={deleteProject.bind(null, p.id)}>
                      <button className="rounded-full border border-rose-400/30 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/10">
                        Delete
                      </button>
                    </form>
                  </Td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <Td colSpan={8} className="py-6 text-center opacity-75">
                  No projects yet.
                </Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ========= Tiny UI helpers ========= */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
      {children}
    </th>
  );
}
function Td({
  children,
  className,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td className={`px-3 py-2 ${className ?? ""}`} colSpan={colSpan}>
      {children}
    </td>
  );
}
function Field({
  name,
  label,
  hint,
  required,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="opacity-85">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        required={required}
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
      />
      {hint && <span className="text-xs opacity-60">{hint}</span>}
    </label>
  );
}
function Textarea({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="opacity-85">
        {label}
        {required && " *"}
      </span>
      <textarea
        name={name}
        rows={4}
        required={required}
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
      />
    </label>
  );
}
