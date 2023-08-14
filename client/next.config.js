/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "www.goodmorningimagesdownload.com",
      "1.bp.blogspot.com",
      "e1.pxfuel.com",
      "i.pravatar.cc",
      "img.clerk.com",
      "uploadthing.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
