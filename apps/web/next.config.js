/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [""],
  },
  output: "standalone",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: "/feedback",
        destination: "/home?post=clx0m1ziw0005pd0192nbbut8",
        permanent: true,
      },
    ];
  },
};
