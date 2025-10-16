import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    domains: ['via.placeholder.com'], // Add any external image domains here
  },
  // Enable compression
  compress: true,
  // Enable react strict mode
  reactStrictMode: true,
};

export default nextConfig;