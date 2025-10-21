"use client";

import { useEffect, useId, useRef, useState } from "react";

function slugify(input: string) {
  return (input ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function SlugField({
  titleInputName = "title",
  slugInputName = "slug",
  basePath = "/portfolio",
}: {
  titleInputName?: string;
  slugInputName?: string;
  basePath?: string; // buat preview URL
}) {
  const id = useId();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const slugRef = useRef<HTMLInputElement | null>(null);
  const [locked, setLocked] = useState(true); // auto mode default
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const t = document.querySelector<HTMLInputElement>(
      `input[name="${titleInputName}"]`
    );
    const s = document.querySelector<HTMLInputElement>(
      `input[name="${slugInputName}"]`
    );
    titleRef.current = t;
    slugRef.current = s;

    const update = () => {
      if (!slugRef.current || !titleRef.current) return;
      if (locked) {
        const next = slugify(slugRef.current.value || titleRef.current.value);
        slugRef.current.value = next;
        setPreview(`${basePath}/${next || ""}`);
      } else {
        setPreview(`${basePath}/${slugify(slugRef.current.value)}`);
      }
    };

    update();
    const onTitle = () => locked && update();
    const onSlug = () => update();

    t?.addEventListener("input", onTitle);
    s?.addEventListener("input", onSlug);
    return () => {
      t?.removeEventListener("input", onTitle);
      s?.removeEventListener("input", onSlug);
    };
  }, [locked, basePath, titleInputName, slugInputName]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preview);
    } catch {}
  };

  return (
    <div className="grid gap-1 text-sm">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="opacity-85">
          Slug *
        </label>
        <span className="ml-auto inline-flex items-center gap-2 text-xs opacity-70">
          <button
            type="button"
            className={
              "rounded-full border px-2 py-0.5 " +
              (locked
                ? "border-violet-400/40 bg-violet-500/10"
                : "border-white/10 bg-white/5")
            }
            onClick={() => setLocked(!locked)}
            title={
              locked
                ? "Auto-generate dari Title (klik untuk manual)"
                : "Manual (klik untuk auto)"
            }
          >
            {locked ? "Auto" : "Manual"}
          </button>
        </span>
      </div>

      <input
        id={id}
        name={slugInputName}
        required
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
        placeholder="contoh: my-awesome-project"
        onBlur={(e) => {
          if (locked) e.currentTarget.value = slugify(e.currentTarget.value);
        }}
      />

      <div className="flex items-center gap-2 text-xs opacity-80">
        <span className="truncate">Preview:</span>
        <code className="truncate rounded bg-white/5 px-2 py-1">
          {preview || `${basePath}/`}
        </code>
        <button
          type="button"
          onClick={copy}
          className="ml-auto underline decoration-dotted hover:opacity-100"
        >
          copy
        </button>
      </div>
      <p className="text-xs opacity-60">
        SEO-friendly: huruf kecil, angka, dan tanda minus.
      </p>
    </div>
  );
}
