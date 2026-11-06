/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.odds-api.io',
        pathname: '/v3/participants/**',
      },
    ],
  },
  serverExternalPackages: ['node-cron'],
  async rewrites() {
    // Keep legacy /favicon.ico requests working without a binary icon file.
    return [{ source: '/favicon.ico', destination: '/icon.svg' }]
  },
}

module.exports = nextConfig
