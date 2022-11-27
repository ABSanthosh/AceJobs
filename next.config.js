/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  i18n: {
    locales: ["en", "hi", "te", "ml"],
    // hi - hindi
    // te - telugu
    // ta - tamil
    // ml - malayalam
    defaultLocale: "en",
    localeDetection: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules[2].oneOf?.forEach((one) => {
      if (!`${one.issuer?.and}`.includes("_app")) return;
      one.issuer.and = [path.resolve(__dirname)];
    });
    return config;
  },
  sassOptions: {
    additionalData: `@import "styles/root/_mixins.scss";`,
  },
};

module.exports = nextConfig;
