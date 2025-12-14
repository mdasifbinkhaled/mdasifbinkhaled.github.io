// SEO Structured Data utilities for academic content
import { siteConfig } from '@/shared/config/site';
import { institutionNames } from '@/shared/lib/data/courses';
import type { CourseInstitution } from '@/shared/types';

export interface AcademicPersonStructuredData {
  '@context': 'https://schema.org';
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

export function generatePersonStructuredData(): AcademicPersonStructuredData {
  // Collect all social profile links (no placeholder detection needed since Twitter is removed)
  const profileLinks: Array<string | undefined> = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.googleScholar,
    siteConfig.links.orcid,
    siteConfig.links.researchGate,
  ];

  const sameAs = profileLinks.filter((url): url is string => Boolean(url));

  return {
    '@context': 'https://schema.org',
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
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Science Education',
      'Data Science',
      'Algorithm Design',
      'Software Engineering',
    ],
    description: siteConfig.description,
    email: siteConfig.email,
    image: `${siteConfig.url}/photo/Photo_Md Asif Bin Khaled.png`,
  };
}

export function generateCourseStructuredData(course: {
  title: string;
  code: string;
  description: string;
  institution: string;
  level: string;
  topics: string[];
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
    timeRequired: 'P1S', // One semester
    teaches: course.topics,
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
