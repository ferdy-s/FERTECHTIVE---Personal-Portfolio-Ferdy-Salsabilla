"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";

export default function ProjectUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  function syncToInput(imgs: string[], thumb: string | null) {
    const input = document.getElementById("images-input") as HTMLInputElement;

    if (input) {
      input.value = JSON.stringify({
        images: imgs,
        thumbnail: thumb,
      });
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files) return;

    let newImages: string[] = [];

    for (const file of Array.from(files)) {
      const path = `projects/${Date.now()}-${file.name}`;

      const { error } = await supabaseClient.storage
        .from("projects")
        .upload(path, file);

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabaseClient.storage
        .from("projects")
        .getPublicUrl(path);

      if (data?.publicUrl) {
        newImages.push(data.publicUrl);
      }
    }

    const updated = [...images, ...newImages];
    const thumb = thumbnail ?? updated[0] ?? null;

    setImages(updated);
    setThumbnail(thumb);
    syncToInput(updated, thumb);
  }

  function removeImage(url: string) {
    const updated = images.filter((i) => i !== url);
    const thumb = thumbnail === url ? (updated[0] ?? null) : thumbnail;

    setImages(updated);
    setThumbnail(thumb);
    syncToInput(updated, thumb);
  }

  function setAsThumbnail(url: string) {
    setThumbnail(url);
    syncToInput(images, url);
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
      />

      {/* PREVIEW */}
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div
            key={i}
            className={`relative group border rounded-lg overflow-hidden ${
              thumbnail === url ? "ring-2 ring-cyan-400" : ""
            }`}
          >
            <img
              src={url}
              className="h-24 w-24 object-cover cursor-pointer"
              onClick={() => setAsThumbnail(url)}
            />

            {/* DELETE BUTTON */}
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>

            {/* LABEL */}
            {thumbnail === url && (
              <span className="absolute bottom-1 left-1 text-[10px] bg-cyan-500 px-1 rounded">
                Thumbnail
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
