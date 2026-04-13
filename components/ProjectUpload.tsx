"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";

export default function ProjectUpload({
  onUploaded,
}: {
  onUploaded: (urls: string[]) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(files: FileList | null) {
    if (!files) return;

    setLoading(true);
    const urls: string[] = [];

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
        urls.push(data.publicUrl);
      }
    }

    setLoading(false);
    onUploaded(urls);
  }

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
      />
      {loading && <p>Uploading...</p>}
    </div>
  );
}
