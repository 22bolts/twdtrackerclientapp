const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve('./src');
    config.resolve.alias['@public'] = path.resolve('./public');
    return config;
  },
  images: {
    domains: [
      'localhost',
      'randomuser.me',
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'picsum.photos',
      'flagcdn.com',
      'utfs.io',
      'images.unsplash.com',
      's3.amazonaws.com',
      'isomorphic-furyroad.s3.amazonaws.com',
      'img.freepik.com',
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