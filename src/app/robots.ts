export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // No phantom paths: this site has no /private or /admin routes.
      // Disallow is intentionally empty; the full static export is public.
      disallow: [],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
