/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: {
    ignoreDuringBuilds: true,
  },
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
