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

module.exports = nextConfig
