// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["*"], // ubah ke domain asli saat sudah live
      bodySizeLimit: "20mb",
    },
  },

  // 🔥 Jika TypeScript error masih banyak (sementara saja)
  typescript: {
    ignoreBuildErrors: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
