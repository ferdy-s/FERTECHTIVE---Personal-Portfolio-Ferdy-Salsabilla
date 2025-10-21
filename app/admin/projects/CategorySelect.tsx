"use client";

import { CATEGORY_LIST, type CategoryValue } from "@/lib/categories";

export default function CategorySelect({
  name = "category",
  required = false,
}: {
  name?: string;
  required?: boolean;
}) {
  const options = CATEGORY_LIST.filter((c) => c.value !== "all");
  return (
    <div className="grid gap-1 text-sm">
      <label className="opacity-85">Category {required ? "*" : ""}</label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
      >
        <option value="" disabled>
          Pilih kategori…
        </option>
        {options.map((c) => (
          <option key={c.value} value={c.value as CategoryValue}>
            {c.label}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2 text-xs opacity-70 mt-1">
        <span>Butuh kategori baru?</span>
        <a
          href="/admin/categories"
          className="underline decoration-dotted hover:opacity-100"
        >
          Tambah kategori
        </a>
      </div>
    </div>
  );
}
