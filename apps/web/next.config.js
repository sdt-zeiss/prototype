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
        destination: "/home?post=54342cc3-2c5a-464e-901e-d696ac0ba722",
        permanent: true,
      },
    ];
  },
};
