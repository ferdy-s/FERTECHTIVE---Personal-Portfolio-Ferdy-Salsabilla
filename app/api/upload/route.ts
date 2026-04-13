import { NextResponse } from "next/server";
import crypto from "crypto";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "File tidak ditemukan" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const ext = path.extname(file.name);
  const filename = `${crypto.randomUUID()}${ext}`;

  const filePath = `uploads/${filename}`;

  // Upload ke Supabase
  const { error } = await supabase.storage
    .from("projects")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const { data } = supabase.storage
    .from("projects")
    .getPublicUrl(filePath);

  return NextResponse.json({
    url: data.publicUrl,
  });
}