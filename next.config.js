/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['otgbac.ovh'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
