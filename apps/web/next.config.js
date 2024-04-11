/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [""],
  },
  experimental: {
    serverActions: true,
  },
};
