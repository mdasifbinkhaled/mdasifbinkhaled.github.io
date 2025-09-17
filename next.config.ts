import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Configure for static export
  outputFileTracingRoot: __dirname, // Fix for multiple lockfiles warning
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checking
  },
  // GitHub Pages configuration
  trailingSlash: true,
  basePath: '',

  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Fix for react-pdf and other client-side dependencies
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }

    // Exclude canvas from server-side builds
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push('canvas');
    }

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
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Required for static export with next/image
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Turbopack configuration (replaces deprecated experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable modern features
  reactStrictMode: true,

  // Page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
