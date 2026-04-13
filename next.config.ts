import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      allowedOrigins: ["*"],
      bodySizeLimit: "20mb",
    },
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // 🔥 TAMBAHKAN INI
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
};

export default nextConfig;