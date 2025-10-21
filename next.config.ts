// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pastikan Turbopack pakai root folder proyek ini
  turbopack: { root: __dirname },

  // Nonaktifkan i18n bawaan, karena middleware kamu sudah menangani
  images: {
    domains: ["images.unsplash.com", "ipfs.io"],
  },

  // Aktifkan Server Actions dan naikkan limit body
  experimental: {
    serverActions: {
      allowedOrigins: ["*"], // izinkan akses dari mana saja (bisa dibatasi domain nanti)
      bodySizeLimit: "20mb", // ← tambahkan baris ini
    },
  },
};

export default nextConfig;
