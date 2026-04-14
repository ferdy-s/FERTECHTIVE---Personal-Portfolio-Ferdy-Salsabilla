"use client";

import { useState } from "react";
import ProjectUpload from "@/components/ProjectUpload";
import { upsertProject } from "@/app/admin/projects/actions";

export default function AdminProjectForm() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <form action={upsertProject}>
      <input name="title" />

      <ProjectUpload />

      {/* 🔥 INI WAJIB ADA */}
      <input type="hidden" name="images" id="images-input" />

      <button>Save</button>
    </form>
  );
}
