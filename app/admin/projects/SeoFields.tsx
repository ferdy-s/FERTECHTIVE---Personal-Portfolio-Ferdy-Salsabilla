"use client";
import { useEffect, useMemo, useState } from "react";

export default function SeoFields({
  defaults,
}: {
  defaults?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string[] | null;
    canonicalUrl?: string | null;
    ogImage?: string | null;
  };
}) {
  const [title, setTitle] = useState(defaults?.metaTitle ?? "");
  const [desc, setDesc] = useState(defaults?.metaDescription ?? "");
  const [kw, setKw] = useState((defaults?.metaKeywords ?? []).join(", "));
  const [canonical, setCanonical] = useState(defaults?.canonicalUrl ?? "");
  const [og, setOg] = useState(defaults?.ogImage ?? "");

  // rekomendasi panjang
  const titleCount = useMemo(() => title.trim().length, [title]);
  const descCount = useMemo(() => desc.trim().length, [desc]);

  useEffect(() => {
    // sinkron ke input hidden standar supaya server action menerima nilai final
    (
      document.querySelector(
        'input[name="metaTitle"]'
      ) as HTMLInputElement | null
    )?.setAttribute("value", title);
    (document.querySelector(
      'textarea[name="metaDescription"]'
    ) as HTMLTextAreaElement | null)!.value = desc;
    (
      document.querySelector(
        'input[name="metaKeywords"]'
      ) as HTMLInputElement | null
    )?.setAttribute("value", kw);
    (
      document.querySelector(
        'input[name="canonicalUrl"]'
      ) as HTMLInputElement | null
    )?.setAttribute("value", canonical);
    (
      document.querySelector('input[name="ogImage"]') as HTMLInputElement | null
    )?.setAttribute("value", og);
  }, [title, desc, kw, canonical, og]);

  return (
    <section className="rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5">
      <h2 className="text-base font-semibold mb-3">SEO</h2>

      {/* Meta Title */}
      <label className="block text-sm opacity-80 mb-1">Meta Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="60–70 karakter ideal"
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 mb-1"
      />
      <p
        className={`text-xs ${titleCount > 70 ? "text-red-400" : "text-white/60"}`}
      >
        {titleCount}/70
      </p>

      {/* Meta Description */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        Meta Description
      </label>
      <textarea
        rows={3}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Ideal 150–160 karakter"
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 mb-1"
      />
      <p
        className={`text-xs ${descCount > 160 ? "text-red-400" : "text-white/60"}`}
      >
        {descCount}/160
      </p>

      {/* Keywords (opsional untuk Google, tetap kita simpan untuk referensi) */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        Keywords (comma separated)
      </label>
      <input
        type="text"
        value={kw}
        onChange={(e) => setKw(e.target.value)}
        placeholder="mis: insurance, health platform, fintech"
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
      />
      <p className="text-xs text-white/50 mt-1">
        Catatan: meta keywords tidak dipakai Google, tapi berguna untuk
        organisasi konten internal.
      </p>

      {/* Canonical */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        Canonical URL
      </label>
      <input
        type="url"
        value={canonical}
        onChange={(e) => setCanonical(e.target.value)}
        placeholder="https://domainmu.com/portfolio/slug"
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
      />

      {/* OG Image */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        OG Image (1200×630)
      </label>
      <input
        type="url"
        value={og}
        onChange={(e) => setOg(e.target.value)}
        placeholder="https://domainmu.com/og/slug.png"
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
      />

      {/* Hidden real inputs yang akan terkirim ke server action */}
      <input
        type="hidden"
        name="metaTitle"
        defaultValue={defaults?.metaTitle ?? ""}
      />
      <textarea
        name="metaDescription"
        className="hidden"
        defaultValue={defaults?.metaDescription ?? ""}
      />
      <input
        type="hidden"
        name="metaKeywords"
        defaultValue={(defaults?.metaKeywords ?? []).join(", ")}
      />
      <input
        type="hidden"
        name="canonicalUrl"
        defaultValue={defaults?.canonicalUrl ?? ""}
      />
      <input
        type="hidden"
        name="ogImage"
        defaultValue={defaults?.ogImage ?? ""}
      />
    </section>
  );
}
