const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Agar images use kar rahe hain to domains allow karein
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'], // DALL-E images ke liye
  },
};

module.exports = withNextIntl(nextConfig);
