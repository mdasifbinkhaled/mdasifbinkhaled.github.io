import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Configure for static export
  basePath: process.env.NODE_ENV === 'production' ? '/mdasifbinkhaled-portfolio-d2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mdasifbinkhaled-portfolio-d2/' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
  // Add redirects for better UX
  async redirects() {
    return [
      {
        source: '/cv.pdf',
        destination: '/CV_Md_Asif_Bin_Khaled.pdf',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/cv',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;