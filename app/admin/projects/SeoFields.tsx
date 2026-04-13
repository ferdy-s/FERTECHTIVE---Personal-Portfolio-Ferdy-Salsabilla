"use client";
import { useMemo, useState } from "react";

const clamp = (v: string, max: number) =>
  v.length > max ? v.slice(0, max) : v;

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

  const safeTitle = clamp(title.trim(), 70);
  const safeDesc = clamp(desc.trim(), 160);

  const titleCount = useMemo(() => safeTitle.length, [safeTitle]);
  const descCount = useMemo(() => safeDesc.length, [safeDesc]);

  return (
    <section className="rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5">
      <h2 className="text-base font-semibold mb-3">SEO</h2>

      {/* Meta Title */}
      <label className="block text-sm opacity-80 mb-1">Meta Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 mb-1"
      />
      <p className="text-xs text-white/60">
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
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 mb-1"
      />
      <p className="text-xs text-white/60">
        {descCount}/160
      </p>

      {/* Keywords */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        Keywords
      </label>
      <input
        type="text"
        value={kw}
        onChange={(e) => setKw(e.target.value)}
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
      />

      {/* Canonical */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        Canonical URL
      </label>
      <input
        type="url"
        value={canonical}
        onChange={(e) => setCanonical(e.target.value)}
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
      />

      {/* OG Image */}
      <label className="block text-sm opacity-80 mt-4 mb-1">
        OG Image
      </label>
      <input
        type="url"
        value={og}
        onChange={(e) => setOg(e.target.value)}
        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
      />

      {/* ✅ Hidden Inputs (FINAL SAFE VALUES) */}
      <input type="hidden" name="metaTitle" value={safeTitle} />
      <textarea
        name="metaDescription"
        className="hidden"
        value={safeDesc}
        readOnly
      />
      <input type="hidden" name="metaKeywords" value={kw} />
      <input type="hidden" name="canonicalUrl" value={canonical} />
      <input type="hidden" name="ogImage" value={og} />
    </section>
  );
}