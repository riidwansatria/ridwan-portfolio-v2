import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    domains: [
      'images.pexels.com',
      'k8boaqmtfy4jtiib.public.blob.vercel-storage.com',
    ],
  },
}

export default nextConfig
