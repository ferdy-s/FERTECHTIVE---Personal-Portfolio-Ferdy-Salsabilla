"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* ==== NEW: Server Action untuk form Request CV di About ==== */
export type CvFormState = { ok: string | null; error: string | null };

export async function createCvRequest(
  _prev: CvFormState,
  formData: FormData
): Promise<CvFormState> {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const company = (String(formData.get("company") || "").trim() || null) as
    | string
    | null;
  const message = (String(formData.get("message") || "").trim() || null) as
    | string
    | null;

  if (!fullName || !email || !email.includes("@")) {
    return { ok: null, error: "Nama dan email wajib diisi dengan benar." };
  }

  const token =
    (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)) +
    "-" +
    Date.now().toString(36);

  await prisma.cvRequest.create({
    data: {
      email,
      source: "about",
      company,
      fullName,
      message,
      token,
      verified: false,
    },
  });

  revalidatePath("/admin/cv");
  return {
    ok: "Permintaan kamu sudah terekam. Cek email jika diminta verifikasi.",
    error: null,
  };
}

/* ==== Existing actions (biarkan) ==== */
export async function toggleVerify(id: string, to: boolean) {
  await prisma.cvRequest.update({
    where: { id },
    data: { verified: to, approvedAt: to ? new Date() : null },
  });
  revalidatePath("/admin/cv");
}

export async function approve(id: string) {
  await prisma.cvRequest.update({
    where: { id },
    data: { approvedBy: "admin", approvedAt: new Date(), verified: true },
  });
  revalidatePath("/admin/cv");
}

export async function remove(id: string) {
  await prisma.cvRequest.delete({ where: { id } });
  revalidatePath("/admin/cv");
}
