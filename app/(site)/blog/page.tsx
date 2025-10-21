// app/blog/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import BlogListClient from "./BlogListClient";
import type { Metadata } from "next";

/* ================= Types & Utils ================= */
type Cat = { id: string; name: string; slug?: string | null };
type Published = Date | string | null;
type Post = {
  id: string;
  slug: string;
  title: string | null;
  excerpt: string | null;
  coverUrl?: string | null;
  thumbnailUrl?: string | null;
  publishedAt: Published;
  author?: { name?: string | null } | null;
  categories?: Cat[];
};

const coverOf = (p: Post) => p.coverUrl || p.thumbnailUrl || "";
const toDate = (d?: Published) =>
  d ? (typeof d === "string" ? new Date(d) : d) : undefined;
const toISO = (d?: Published) =>
  d ? (d instanceof Date ? d.toISOString() : d) : undefined;
const fmtDate = (d?: Published) => {
  const dt = toDate(d);
  return dt
    ? dt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";
};

/* ================= Caching ================= */
export const revalidate = 3600; // ISR 1 jam
export const dynamic = "force-static";

/* ================= SEO Metadata =================
   Pastikan process.env.NEXT_PUBLIC_SITE_URL terisi
*/
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tips & Trik",
  description:
    "Editorial futuristik tentang UI/UX, engineering, dan produktivitas kreator.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Tips & Trik",
    description:
      "Editorial futuristik tentang UI/UX, engineering, dan produktivitas kreator.",
    images: [{ url: `${SITE_URL}/og/blog.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tips & Trik",
    description:
      "Editorial futuristik tentang UI/UX, engineering, dan produktivitas kreator.",
    images: [`${SITE_URL}/og/blog.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
  },
};

/* ================= Page ================= */
export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string };
}) {
  const q = (searchParams.q ?? "").trim();
  const cat = (searchParams.cat ?? "all").toLowerCase();

  // Filter di database (cepat & ramah crawler)
  const where: any = {
    AND: [
      q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { excerpt: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      cat !== "all"
        ? {
            categories: {
              some: {
                OR: [
                  { slug: cat },
                  { name: { equals: searchParams.cat, mode: "insensitive" } },
                ],
              },
            },
          }
        : {},
      { publishedAt: { not: null } },
    ],
  };

  const [posts, categories] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true, categories: true },
      orderBy: { publishedAt: "desc" },
      take: 40,
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  // Casting aman ke tipe lokal kita (publishedAt bisa Date|string|null)
  const typedPosts = posts as unknown as Post[];
  const [featured, ...rest] = typedPosts;

  return (
    <main
      className="relative isolate min-h-screen bg-[#05060A] text-white overflow-hidden"
      aria-label="Halaman Blog"
    >
      {/* background dekoratif tanpa JS */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_0%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(1200px_600px_at_90%_10%,rgba(139,92,246,0.12),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.26) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.26) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(80% 60% at 50% 8%, black 35%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(80% 60% at 50% 8%, black 35%, transparent 70%)",
          }}
        />
      </div>

      <section className="mx-auto max-w-[1520px] px-5 sm:px-6 md:px-10 lg:px-16 pt-36 md:pt-40 pb-36">
        <header className="mb-8 md:mb-10">
          <h1 className="text-[40px] sm:text-[48px] md:text-[64px] xl:text-[76px] font-black tracking-tight leading-[1.04]">
            TIPS &amp; TRIK
          </h1>
          <p className="mt-2 text-white/70 max-w-2xl text-base md:text-lg">
            Editorial futuristik tentang UI/UX, engineering, dan produktivitas
            kreator.
          </p>
        </header>

        {/* HERO server-rendered (tanpa hidrasi) */}
        {featured && (
          <article
            className="group mb-10 md:mb-14 grid grid-cols-1 lg:grid-cols-[1.12fr,1fr] overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0E14]/70 hover:border-cyan-400/25 transition-all"
            aria-labelledby={`post-${featured.id}-title`}
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="contents"
              aria-label={`Baca artikel unggulan: ${featured.title ?? "Tanpa judul"}`}
            >
              <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[480px]">
                {coverOf(featured) ? (
                  <Image
                    src={coverOf(featured)!}
                    alt={`Sampul artikel: ${featured.title ?? "Tanpa judul"}`}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-cyan-700/20 to-violet-800/20"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] border border-white/15 bg-black/50 backdrop-blur">
                  {featured.categories?.[0]?.name ?? "Umum"}
                </span>
              </div>

              <div className="p-6 sm:p-8 md:p-10 xl:p-14 flex flex-col justify-center">
                <h2
                  id={`post-${featured.id}-title`}
                  className="text-[24px] sm:text-[28px] md:text-[38px] xl:text-[42px] font-semibold leading-tight"
                >
                  {featured.title}
                </h2>
                <p className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base md:text-lg line-clamp-5">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[12px] sm:text-sm text-white/60">
                  <span>{featured.author?.name ?? "Anon"}</span>
                  <span aria-hidden>•</span>
                  <time dateTime={toISO(featured.publishedAt)}>
                    {fmtDate(featured.publishedAt)}
                  </time>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Island ringan: search + kategori via URL query */}
        <BlogListClient
          categories={categories as unknown as Cat[]}
          total={typedPosts.length}
        />

        {/* LIST server-rendered (0 JS) */}
        <section id="blog-list" aria-label="Daftar artikel">
          {rest.length > 0 ? (
            <ul
              className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
              role="list"
            >
              {rest.map((p) => (
                <li key={p.id}>
                  <article
                    className="group relative overflow-hidden rounded-2xl border border-white/12 bg-[#0B1119]/75 hover:bg-[#0E1521]/85 hover:border-cyan-400/25 transition-all"
                    aria-labelledby={`post-${p.id}-title`}
                  >
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block focus:outline-none focus:ring-2 focus:ring-cyan-400/60 rounded-2xl"
                      aria-label={`Baca artikel: ${p.title ?? "Tanpa judul"}`}
                    >
                      <div className="relative aspect-[16/10]">
                        {coverOf(p) ? (
                          <Image
                            src={coverOf(p)!}
                            alt={`Sampul artikel: ${p.title ?? "Tanpa judul"}`}
                            fill
                            loading="lazy"
                            sizes="(max-width:768px) 100vw, 25vw"
                            className="object-cover"
                          />
                        ) : (
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-br from-cyan-700/20 to-violet-800/20"
                          />
                        )}
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] text-cyan-300 backdrop-blur">
                          {p.categories?.[0]?.name ?? "Umum"}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3
                          id={`post-${p.id}-title`}
                          className="text-[16px] sm:text-[18px] font-semibold leading-snug line-clamp-2"
                        >
                          {p.title}
                        </h3>
                        <p className="mt-2 text-[13px] sm:text-[14px] text-white/70 line-clamp-2">
                          {p.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-[12px] text-white/55">
                          <span>{p.author?.name ?? "Anon"}</span>
                          <span aria-hidden>•</span>
                          <time dateTime={toISO(p.publishedAt)}>
                            {fmtDate(p.publishedAt)}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="text-center text-white/60 py-20"
              role="status"
              aria-live="polite"
            >
              Tidak ada artikel ditemukan.
            </p>
          )}
        </section>

        {/* JSON-LD (Blog + items) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              inLanguage: "id-ID",
              name: "Tips & Trik",
              url: `${SITE_URL}/blog`,
              blogPost: typedPosts.slice(0, 16).map((p, i) => ({
                "@type": "BlogPosting",
                headline: p.title ?? undefined,
                description: p.excerpt ?? undefined,
                datePublished: toISO(p.publishedAt) ?? undefined,
                author: { "@type": "Person", name: p.author?.name ?? "Anon" },
                url: `${SITE_URL}/blog/${p.slug}`,
                mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
                position: i + 1,
              })),
            }),
          }}
        />
      </section>
    </main>
  );
}
