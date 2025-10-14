export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/_next/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
