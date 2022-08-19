/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['otgbac.ovh'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  reactStrictMode: true,
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
module.exports = nextConfig
