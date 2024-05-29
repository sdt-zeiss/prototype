/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [""],
  },
  output: 'standalone',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};
