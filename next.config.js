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
  output: 'standalone',
  reactStrictMode: false,
  // Add these to disable experimental features
  // experimental: {
  //   turbo: false,
  //   serverActions: false
  // }
};

module.exports = nextConfig;