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
}

module.exports = nextConfig
