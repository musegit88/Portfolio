/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "nttqwnnfqwltwmrmtsef.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
