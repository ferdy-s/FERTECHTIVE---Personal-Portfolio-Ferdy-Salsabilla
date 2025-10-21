"use client";

export default function FilePicker({
  name,
  accept,
  maxBytes,
  maxFiles,
}: {
  name: string;
  accept: string;
  maxBytes: number;
  maxFiles: number;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="opacity-85">Images (jpg / jpeg / png)</span>
      <input
        type="file"
        name={name}
        multiple
        accept={accept}
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm hover:file:bg-white/20"
        onChange={(e) => {
          const files = Array.from(e.currentTarget.files ?? []);
          if (files.length > maxFiles) {
            alert(`Terlalu banyak file. Maksimal ${maxFiles}.`);
            e.currentTarget.value = "";
            return;
          }

          let total = 0;
          for (const f of files) {
            total += f.size || 0;
            if (f.size > maxBytes) {
              alert(
                `"${f.name}" lebih dari ${(maxBytes / (1024 * 1024)).toFixed(
                  0
                )}MB. Kompres dulu ya.`
              );
              e.currentTarget.value = "";
              return;
            }
          }

          if (total > 20 * 1024 * 1024) {
            alert("Total ukuran gambar melebihi 20MB. Kurangi jumlah file.");
            e.currentTarget.value = "";
          }
        }}
      />
      <span className="text-xs opacity-60">
        Maks {Math.floor(maxBytes / (1024 * 1024))}MB per file, maksimal{" "}
        {maxFiles} file, total ≤ 20MB.
      </span>
    </label>
  );
}
