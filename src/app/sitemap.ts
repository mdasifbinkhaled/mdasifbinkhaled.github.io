export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';
import { getDetailedCourses } from '@/shared/lib/data/courses';
import { getAllPosts } from '@/shared/lib/mdx';

const fallbackLastModified = '2026-01-01T00:00:00.000Z';

const resolveSiteLastModified = () => {
  const parsed = new Date(siteConfig.lastUpdated);
  return Number.isNaN(parsed.getTime())
    ? fallbackLastModified
    : parsed.toISOString();
};

const resolvePostLastModified = (value: string) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? resolveSiteLastModified()
    : parsed.toISOString();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const siteLastModified = resolveSiteLastModified();
  const posts = await getAllPosts();

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/talks`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/teaching`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/teaching/iub`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/teaching/bracu`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apps/exam-countdown`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apps/gpa-calculator`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apps/grade-calculator`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apps/office-hours`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/apps/seat-planner`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic course detail pages
  const detailedCourses = getDetailedCourses();
  const courseRoutes: MetadataRoute.Sitemap = detailedCourses.map((course) => ({
    url: `${baseUrl}/teaching/${course.institution.toLowerCase()}/${course.slug || course.code.toLowerCase().replace(/\s+/g, '')}`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: resolvePostLastModified(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
