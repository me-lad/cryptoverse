import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'images.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.decrypt.co',
      },
      {
        protocol: 'https',
        hostname: 'www.coindesk.com',
      },
      {
        protocol: 'https',
        hostname: 'static.coindesk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.coindesk.com',
      },
      {
        protocol: 'https',
        hostname: 'api.coindesk.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'min-api.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'data.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'images.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'images.cointelegraph.com',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'data-api.coindesk.com',
      },
    ],
  },
};

export default nextConfig;
