// app/components/FooterMonochromeCompact.tsx
// Server Component – elegant monochrome, compact & proportional, SEO-friendly
import Link from "next/link";
import Script from "next/script";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kontak" },
];

export default function FooterMonochromeCompact() {
  const year = new Date().getFullYear();
  const siteName = "Fertechtive";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fertechtive.com";
  const email = "ferdysalsabilla87@gmail.com";
  const phoneIntl = "+6282134027993"; // E.164

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email,
    telephone: phoneIntl,
    sameAs: [
      "https://github.com/ferdysalsabilla",
      "https://www.linkedin.com/in/ferdysalsabilla",
      "https://wa.me/6282134027993",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangerang Selatan",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
  };

  return (
    <footer
      role="contentinfo"
      className="relative bg-black text-white border-t border-white/10 overflow-x-clip"
    >
      {/* === CTA compact === */}
      <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 lg:px-6 py-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 sm:p-6 lg:p-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6 shadow-[0_0_1px_0_rgba(255,255,255,.10)]">
          <div className="flex-1">
            <h2 className="font-extrabold tracking-tight leading-tight text-[clamp(20px,2.6vw,26px)]">
              <span className="text-white/90">{siteName}.</span>{" "}
              <span className="font-semibold text-white/70">
                Living-portfolio for product-grade UI/UX & engineering.
              </span>
            </h2>
            <p className="mt-1.5 max-w-2xl text-[13.5px]/relaxed text-white/60">
              Desain bersih, performa cepat, SEO kuat, alur kerja skalabel.
            </p>
          </div>

          <div className="flex gap-2.5">
            <a
              href={`https://wa.me/${phoneIntl.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white text-black/80 px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
              aria-label="Konsultasi WhatsApp"
            >
              Konsultasi
            </a>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            >
              Lihat Karya
            </Link>
          </div>
        </div>
      </section>

      {/* === GRID compact: 4 / 4 / 4 === */}
      <section className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 lg:px-6 pb-8">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-12 items-start">
          {/* ABOUT */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold tracking-wide text-white/75">
              Tentang
            </h3>
            <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-white/65">
              {siteName} memadukan UI/UX, front-end, dan engineering untuk hasil
              nyata—fokus pada kecepatan, aksesibilitas, dan maintainability.
            </p>
          </div>

          {/* NAV */}
          <nav aria-label="Navigasi footer" className="lg:col-span-4">
            <h3 className="text-xs font-semibold tracking-wide text-white/75">
              Navigasi
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-white/75">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 rounded transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL + CONTACT ICONS */}
          <div className="lg:col-span-4 lg:justify-self-end">
            <h3 className="text-xs font-semibold tracking-wide text-white/75">
              Terhubung
            </h3>
            <ul
              className="mt-3 flex flex-wrap items-center gap-2.5"
              aria-label="Ikon sosial & kontak"
            >
              {[
                {
                  href: "https://github.com/ferdysalsabilla",
                  label: "GitHub",
                  svg: (
                    <path
                      fill="currentColor"
                      d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.8-.25.8-.57v-2.1c-3.26.71-3.95-1.57-3.95-1.57-.53-1.35-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.26 3.4.96.11-.76.41-1.26.74-1.55-2.6-.3-5.33-1.3-5.33-5.77 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.53.11-3.18 0 0 .98-.31 3.2 1.2a11.1 11.1 0 0 1 5.82 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.65.23 2.88.11 3.18.75.82 1.2 1.87 1.2 3.15 0 4.49-2.74 5.46-5.35 5.75.42.36.8 1.07.8 2.17v3.21c0 .32.2.69.81.57A11.5 11.5 0 0 0 12 .5Z"
                    />
                  ),
                  ext: true,
                },
                {
                  href: "https://www.linkedin.com/in/ferdysalsabilla",
                  label: "LinkedIn",
                  svg: (
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.56v-5.54c0-1.32-.02-3.01-1.84-3.01-1.85 0-2.13 1.44-2.13 2.92v5.63H9.36V9h3.42v1.56h.05c.48-.9 1.66-1.84 3.41-1.84 3.65 0 4.33 2.4 4.33 5.52v6.21ZM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
                    />
                  ),
                  ext: true,
                },
                {
                  href: `mailto:${email}`,
                  label: "Email",
                  svg: (
                    <path
                      fill="currentColor"
                      d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                    />
                  ),
                },
                {
                  href: `https://wa.me/${phoneIntl.replace("+", "")}`,
                  label: "WhatsApp",
                  svg: (
                    <path
                      fill="currentColor"
                      d="M20.52 3.48A11.86 11.86 0 0 0 2.7 17.8L2 22l4.3-.67A11.86 11.86 0 0 0 21 12a11.8 11.8 0 0 0-.48-8.52ZM12 20a8 8 0 0 1-4.08-1.1l-.29-.17-2.42.38.38-2.36-.19-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8Z"
                    />
                  ),
                  ext: true,
                },
              ].map(({ href, label, svg, ext }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(ext
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={label}
                    title={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] transition"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-[18px] w-[18px]"
                    >
                      {svg}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 max-w-[420px] rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[13px] text-white/65">
                “Minimal surface, maximal clarity.” Visual presisi,
                aksesibilitas terjaga, performa cepat.
              </p>
            </div>
          </div>
        </div>

        {/* LEGAL compact */}
        <div className="mt-8 border-t border-white/10 pt-5 text-[12px] text-white/55">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p>
              © {year} {siteName}. All rights reserved.
            </p>
            <p className="text-center md:text-right">
              Built with Next.js • elegant monochrome • Accessible & SEO-ready
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD non-blocking */}
      <Script
        id="org-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </footer>
  );
}
