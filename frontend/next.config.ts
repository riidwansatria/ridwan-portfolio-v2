import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
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
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
