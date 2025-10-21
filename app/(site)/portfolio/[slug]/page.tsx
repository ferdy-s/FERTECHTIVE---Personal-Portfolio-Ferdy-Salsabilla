// app/portfolio/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ====== Site base URL (untuk canonical/OG/JSON-LD) ====== */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

/* ====== Metadata dinamis per project ====== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!p) {
    return {
      title: "Project Not Found",
      description: "Halaman proyek tidak ditemukan.",
    };
  }

  const url = `${SITE_URL}/portfolio/${p.slug}`;
  const title = p.metaTitle || p.title || "Portfolio Project";
  const description =
    p.metaDescription || p.description || "Detail proyek di portfolio.";
  const ogImage = p.ogImage || p.thumbnailUrl || "/default-cover.jpg";

  return {
    title,
    description,
    keywords:
      p.metaKeywords && p.metaKeywords.length ? p.metaKeywords : undefined,
    alternates: {
      canonical: p.canonicalUrl || url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ---- Helper Functions ---- */
function s(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString();
  return undefined;
}
function a(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}
function h(v: unknown): string {
  return typeof v === "string" ? v : "";
}

/* ---- Main Page ---- */
export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });
  if (!project) return notFound();

  const title = s((project as any).title) ?? "Untitled Project";
  const category = s((project as any).category) ?? "Project";
  const desc =
    s((project as any).description) ??
    "Platform modern untuk riset data, scraping berita, dan analisis topik secara otomatis.";
  const tags = a((project as any).tags);
  const html = h((project as any).content);
  const cover = s((project as any).thumbnailUrl) ?? "/default-cover.jpg";

  /* ====== JSON-LD (Structured Data) ====== */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: (project as any).metaTitle || title,
    description: (project as any).metaDescription || desc,
    image: (project as any).ogImage || cover,
    url: `${SITE_URL}/portfolio/${(project as any).slug}`,
    // gunakan tanggal bila ada
    datePublished: (project as any).publishedAt || (project as any).createdAt,
    dateModified: (project as any).updatedAt,
    keywords:
      Array.isArray((project as any).metaKeywords) &&
      (project as any).metaKeywords.length
        ? (project as any).metaKeywords.join(", ")
        : undefined,
  };

  return (
    <section className="relative min-h-screen bg-[#0B0D12] text-white antialiased overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#0B0D12] via-[#090C12] to-black"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]
        [background-image:linear-gradient(to_right,rgba(255,255,255,.4)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(255,255,255,.4)_1px,transparent_1px)]
        [background-size:32px_32px]"
      />

      {/* === HERO SECTION === */}
      <header className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pt-28 md:pt-32 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6">
            <p className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] tracking-wide text-white/60 uppercase">
              {category}
            </p>
            <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.1] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-[16px] text-white/80 max-w-[560px] leading-relaxed">
              {desc}
            </p>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[11px] text-white/80 select-none"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Column */}
          <div className="lg:col-span-6 w-full">
            <figure className="relative aspect-[14/9] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#10131A] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src={cover}
                alt={title}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 640px"
                className="object-cover object-center"
              />
            </figure>
          </div>
        </div>
      </header>

      {/* === CONTENT === */}
      <main className="relative mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-32">
        {/* Divider */}
        <div
          aria-hidden
          className="mb-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Rich Text Content */}
        <article
          className="prose prose-invert max-w-none
          prose-p:text-white/90 prose-a:text-sky-400 hover:prose-a:text-sky-300
          prose-strong:text-white prose-blockquote:border-sky-500/40
          prose-h2:text-white prose-h3:text-white/90 prose-code:text-sky-300
          prose-img:rounded-lg prose-img:border prose-img:border-white/10
          leading-relaxed tracking-[0.005em]"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Optional fallback */}
        {(!html || html.trim() === "") && (
          <p className="text-white/50 text-sm mt-10 text-center">
            Konten proyek ini belum diisi.
          </p>
        )}

        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[140px] max-w-[900px]
          bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_60%)]"
        />
      </main>
    </section>
  );
}
