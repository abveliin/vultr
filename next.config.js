/** @type {import('next').NextConfig} */
/*const nextConfig = {
  reactStrictMode: true,
};*/

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: [
      "scontent.cdninstagram.com",
      "video.cdninstagram.com",
      "scontent-mba1-1.cdninstagram.com",
      "res.cloudinary.com",
    ],
  },
  experimental: { appDir: true },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
//module.exports = nextConfig
