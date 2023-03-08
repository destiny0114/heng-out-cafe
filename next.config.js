/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    SHOPIFY_STORE_ENDPOINT: process.env.SHOPIFY_STORE_ENDPOINT,
    SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/2022-10/:slug*",
        destination: `https://heng-out-cafe.myshopify.com/api/2022-10/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;
