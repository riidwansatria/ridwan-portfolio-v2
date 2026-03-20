import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'k8boaqmtfy4jtiib.public.blob.vercel-storage.com',
        pathname: '/**',
      },
{
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'books.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
