/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.jsx", "page.js"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    suppressHydrationWarning: true,
  },
  swcMinify: true,
};

export default nextConfig;
