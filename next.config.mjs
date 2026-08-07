/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/personal-website',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
