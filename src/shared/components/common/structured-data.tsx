import { siteConfig } from '@/shared/config/site';
import { samplePublications } from '@/shared/lib/data/publications';
import type { PublicationItem } from '@/shared/types';

type JsonLd = Record<string, unknown>;

const TWITTER_PLACEHOLDER = 'https://twitter.com/yourusername';

function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function JsonLdScript({ data }: { data: unknown }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(data) }}
    />
  );
}

function buildScholarStructuredData(): JsonLd {
  const sameAs = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.googleScholar,
  ];

  if (
    siteConfig.links.twitter &&
    siteConfig.links.twitter !== TWITTER_PLACEHOLDER
  ) {
    sameAs.push(siteConfig.links.twitter);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    givenName: 'Md Asif Bin',
    familyName: 'Khaled',
    jobTitle: 'Senior Lecturer & Researcher',
    workLocation: {
      '@type': 'Place',
      name: 'Independent University, Bangladesh',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Independent University, Bangladesh',
      url: 'https://www.iub.edu.bd/',
    },
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bashundhara R/A',
      addressLocality: 'Dhaka',
      postalCode: '1212',
      addressCountry: 'Bangladesh',
    },
    sameAs,
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Independent University, Bangladesh',
        url: 'https://www.iub.edu.bd/',
        sameAs: 'https://www.iub.edu.bd/',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'BRAC University',
        url: 'https://www.bracu.ac.bd/',
        sameAs: 'https://www.bracu.ac.bd/',
      },
    ],
    knowsAbout: [
      'Explainable AI (XAI)',
      'Multimodal AI (MMAI)',
      'Computer Vision (CV)',
      'Healthcare AI',
      'Machine Learning',
      'Deep Learning',
      'Data Mining',
      'Algorithm Design',
      'Outcome-Based Education (OBE)',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Master of Science in Computer Science',
        educationalLevel: 'https://schema.org/CollegeDegree',
        awardedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'Independent University, Bangladesh',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Science in Computer Science and Engineering',
        educationalLevel: 'https://schema.org/CollegeDegree',
        awardedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'BRAC University',
        },
      },
    ],
    researchInterest: [
      'Explainable AI (XAI): Ensuring transparency and trustworthiness in disease detection, diagnosis, and healthcare analytics utilizing Artificial Intelligence (AI).',
      'Multimodal AI (MMAI) & Computer Vision (CV): Using Multimodal AI (MMAI) and Computer Vision (CV) to combine imaging, clinical records, and lab results for holistic diagnostics.',
    ],
  };
}

function getPublisherName(venue?: string): string {
  if (!venue) {
    return 'Academic Publisher';
  }

  if (venue.includes('IEEE')) {
    return 'IEEE';
  }

  if (venue.includes('Springer')) {
    return 'Springer';
  }

  return 'Academic Publisher';
}

function buildPublicationStructuredData(publication: PublicationItem): JsonLd {
  const article: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    name: publication.title,
    author: publication.authors.map((authorName) => ({
      '@type': 'Person',
      name: authorName,
    })),
    publisher: {
      '@type': 'Organization',
      name: getPublisherName(publication.venue),
    },
  };

  if (publication.year) {
    article.datePublished = publication.year.toString();
  }

  if (publication.venue) {
    article.isPartOf = {
      '@type': 'PublicationVolume',
      name: publication.venue,
    };
  }

  if (publication.link) {
    article.url = publication.link;
  }

  if (publication.doi) {
    article.identifier = {
      '@type': 'PropertyValue',
      propertyID: 'doi',
      value: publication.doi,
    };
  }

  if (publication.abstract) {
    article.description = publication.abstract;
  }

  if (publication.keywords?.length) {
    article.keywords = publication.keywords.join(', ');
  }

  return article;
}

export function ScholarStructuredDataScript(): JSX.Element {
  return <JsonLdScript data={buildScholarStructuredData()} />;
}

export function PublicationStructuredDataScript(): JSX.Element | null {
  if (samplePublications.length === 0) {
    return null;
  }

  const publications = samplePublications.map(buildPublicationStructuredData);
  const jsonLd = publications.length === 1 ? publications[0] : publications;

  return <JsonLdScript data={jsonLd} />;
}

export { buildScholarStructuredData, buildPublicationStructuredData };
