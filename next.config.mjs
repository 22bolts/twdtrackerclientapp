/** @type {import('next').NextConfig} */
import path from 'path';

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
  reactStrictMode: false,
};

export default nextConfig;