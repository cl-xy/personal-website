/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/projects', destination: '/#field-notes', permanent: true },
      { source: '/resume', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

// deploy trigger
