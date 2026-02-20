import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  typedRoutes: true,
  experimental: {
    scrollRestoration: true,
  },
};
export default analyzer(config);
