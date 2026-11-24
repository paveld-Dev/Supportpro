/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow static image imports from src/assets
  images: {
    domains: [],
    unoptimized: false,
  },
  experimental: {},
};

export default nextConfig;
