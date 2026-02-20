// SEO Structured Data utilities for academic content
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import { institutionNames } from '@/shared/lib/data/courses';
import type { CourseInstitution } from '@/shared/types';

/**
 * Sanitize JSON-LD output to prevent XSS injection via script breakout.
 * Escapes `<`, `>`, `&`, and Unicode line/paragraph separators.
 */
export function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export interface AcademicPersonStructuredData {
  '@context': 'https://schema.org';
  '@type': 'ProfilePage';
  mainEntity: {
    '@type': 'Person';
    name: string;
    jobTitle: string;
    affiliation: {
      '@type': 'EducationalOrganization';
      name: string;
      url?: string;
    };
    url: string;
    sameAs: string[];
    knowsAbout: string[];
    description: string;
    email?: string;
    image?: string;
  };
}

export interface CourseStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Course';
  name: string;
  description: string;
  provider: {
    '@type': 'EducationalOrganization';
    name: string;
  };
  instructor: {
    '@type': 'Person';
    name: string;
  };
  courseCode: string;
  educationalLevel: string;
  timeRequired: string;
  teaches: string[];
  url?: string;
}

export interface PublicationStructuredData {
  '@context': 'https://schema.org';
  '@type': 'ScholarlyArticle';
  headline: string;
  author: Array<{
    '@type': 'Person';
    name: string;
  }>;
  publisher?: {
    '@type': 'Organization';
    name: string;
  };
  datePublished?: string;
  abstract?: string;
  keywords?: string[];
  url?: string;
  doi?: string;
}

import { researchIdentity } from '@/shared/config/researcher-profile';

export function generatePersonStructuredData(): AcademicPersonStructuredData {
  // Collect all social profile links (no placeholder detection needed since Twitter is removed)
  const profileLinks: Array<string | undefined> = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.googleScholar,
    siteConfig.links.orcid,
    siteConfig.links.researchGate,
    siteConfig.links.academiaEdu,
  ];

  const sameAs = profileLinks.filter((url): url is string => Boolean(url));

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.author,
      jobTitle: siteConfig.jobTitle,
      affiliation: {
        '@type': 'EducationalOrganization',
        name: siteConfig.institution,
        url: 'https://www.iub.edu.bd',
      },
      url: siteConfig.url,
      sameAs,
      knowsAbout: researchIdentity.primaryAreas.map((area) => area.name),
      description: siteConfig.description,
      email: siteConfig.email,
      image: `${siteConfig.url}${assetPaths.profile}`,
    },
  };
}

export function generateCourseStructuredData(course: {
  title: string;
  code: string;
  description: string;
  institution: string;
  level: string;
  outcomes: string[];
  technologies?: string[];
}): CourseStructuredData {
  const providerName =
    institutionNames[course.institution as CourseInstitution] ??
    course.institution;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: providerName,
    },
    instructor: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    courseCode: course.code,
    educationalLevel: course.level,
    timeRequired: 'P16W', // One semester (~16 weeks)
    teaches: course.outcomes,
    url: `${siteConfig.url}/teaching#${course.code.toLowerCase().replace(/\s+/g, '-')}`,
  };
}

export function generatePublicationStructuredData(publication: {
  title: string;
  authors: string[];
  venue?: string;
  year?: number;
  abstract?: string;
  keywords?: string[];
  doi?: string;
  url?: string;
}): PublicationStructuredData {
  const structuredData: PublicationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    author: publication.authors.map((author) => ({
      '@type': 'Person',
      name: author,
    })),
  };

  if (publication.venue) {
    structuredData.publisher = {
      '@type': 'Organization',
      name: publication.venue,
    };
  }

  if (publication.year) {
    structuredData.datePublished = publication.year.toString();
  }

  if (publication.abstract) {
    structuredData.abstract = publication.abstract;
  }

  if (publication.keywords) {
    structuredData.keywords = publication.keywords;
  }

  if (publication.url) {
    structuredData.url = publication.url;
  }

  if (publication.doi) {
    structuredData.doi = publication.doi;
  }

  return structuredData;
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
  };
}
