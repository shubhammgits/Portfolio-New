import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com'],
  },
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;