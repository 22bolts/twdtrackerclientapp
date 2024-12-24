const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve('./src');
    config.resolve.alias['@public'] = path.resolve('./public');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      }
    ],
  },
  env: {
    NEXTAUTH_URL: 'https://twdtracker.com',
    NEXTAUTH_SECRET: 'TTW)mC%Z)]GXd2crp^t+fMaNCu.pg|RH'
  },
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    turbo: {
        enabled: false, // Properly disable Turbopack
    },
  },
};

module.exports = nextConfig;