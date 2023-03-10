/**
 * @file React framework configuration
 * https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const { i18n } = require("./next-i18next.config");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      "./node_modules/@uswds",
      "./node_modules/@uswds/uswds/packages",
    ],
  },
};

module.exports = nextConfig;
