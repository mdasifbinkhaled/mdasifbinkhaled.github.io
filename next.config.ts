import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Configure for static export
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Fix for react-pdf and other client-side dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }
    
    // Exclude canvas from server-side builds
    config.externals = config.externals || [];
    config.externals.push('canvas');
    
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Required for static export with next/image
  },
};

export default nextConfig;