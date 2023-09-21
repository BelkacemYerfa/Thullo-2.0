/** @type {import('next').NextConfig} */
const config = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    return config;
  },
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

module.exports = config;
