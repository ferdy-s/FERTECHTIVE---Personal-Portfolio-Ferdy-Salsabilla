"use client";

import { useId, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/* ===== Types ===== */
type Cat = { id: string; name: string; slug?: string | null };

export default function BlogListClient({
  categories,
  total,
}: {
  categories: Cat[];
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, start] = useTransition();
  const inputId = useId();

  const q = sp.get("q") ?? "";
  const activeCat = (sp.get("cat") ?? "all").toLowerCase();

  const update = (key: "q" | "cat", value?: string) => {
    const params = new URLSearchParams(sp.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    start(() =>
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    );
  };

  return (
    <>
      {/* SEARCH DOCK (tanpa scroll listener → no forced reflow) */}
      <section
        className="sticky top-[84px] z-30 mb-4 rounded-2xl border border-white/12 bg-[#0C121B]/80 backdrop-blur-xl shadow-[0_10px_36px_rgba(0,0,0,0.35)]"
        role="search"
        aria-label="Pencarian artikel"
      >
        <div className="p-4 sm:px-5 sm:py-5">
          <label
            htmlFor={inputId}
            className="block text-[12px] uppercase tracking-widest text-white/50 mb-2"
          >
            Pencarian Cepat
          </label>
          <div className="relative">
            <input
              id={inputId}
              defaultValue={q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Cari topik, teknologi, atau penulis…"
              className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 sm:px-5 pl-11 py-3 sm:py-3.5 text-sm sm:text-base placeholder-white/40 focus:ring-2 focus:ring-cyan-400/40 outline-none"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              aria-label="Cari artikel"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 7.5 7.5a7.5 7.5 0 0 0 9.15 9.15Z"
              />
            </svg>
          </div>
          <p
            className="mt-2 text-xs text-white/60"
            aria-live="polite"
            aria-atomic="true"
          >
            {isPending ? "Memuat…" : `${total} artikel ditemukan`}
          </p>
        </div>
      </section>

      {/* CATEGORY DOCK */}
      <nav
        className="sticky top-[152px] z-20 mb-10 rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-xl"
        aria-label="Filter kategori"
      >
        <div className="px-3 sm:px-4 py-3 overflow-x-auto">
          <ul className="flex gap-2 sm:gap-3 min-w-max pb-1" role="list">
            <li>
              <Chip
                active={activeCat === "all"}
                label="Semua"
                onClick={() => update("cat", "all")}
              />
            </li>
            {categories.map((c) => {
              const slug = (c.slug ?? c.name).toLowerCase();
              return (
                <li key={c.id}>
                  <Chip
                    active={activeCat === slug}
                    label={c.name}
                    onClick={() => update("cat", slug)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

/* ===== UI ===== */
function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400/60
      ${
        active
          ? "bg-gradient-to-r from-cyan-400 to-blue-400 text-black shadow-[0_0_0_2px_rgba(34,211,238,0.25)_inset]"
          : "bg-white/[0.06] hover:bg-white/[0.12] text-white/85"
      }`}
      aria-pressed={active}
      aria-label={`Filter kategori ${label}`}
    >
      {label}
    </button>
  );
}
