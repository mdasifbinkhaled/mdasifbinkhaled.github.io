import { samplePublications } from '@/shared/lib/data/publications';
import type { CourseData } from '@/shared/types';
import {
  generateCourseStructuredData,
  generatePersonStructuredData,
  generatePublicationStructuredData,
} from '@/shared/lib/structured-data';

function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function JsonLdScript({ data }: { data: unknown }): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(data) }}
    />
  );
}

export function ScholarStructuredDataScript(): React.JSX.Element {
  return <JsonLdScript data={generatePersonStructuredData()} />;
}

export function PublicationStructuredDataScript(): React.JSX.Element | null {
  if (samplePublications.length === 0) {
    return null;
  }

  // PublicationItem vs the expected input of generatePublicationStructuredData might differ.
  // generatePublicationStructuredData expects { title, authors, venue?, year?, abstract?, keywords?, doi?, url? }
  // PublicationItem has { title, authors (string[]), venue, year, link (as url), doi, abstract, keywords? }
  // Let's map it.

  const publications = samplePublications.map((pub) =>
    generatePublicationStructuredData({
      title: pub.title,
      authors: pub.authors,
      venue: pub.venue,
      year: pub.year,
      abstract: pub.abstract,
      keywords: pub.keywords,
      doi: pub.doi,
      url: pub.link,
    })
  );

  const jsonLd = publications.length === 1 ? publications[0] : publications;

  return <JsonLdScript data={jsonLd} />;
}

export function CourseStructuredDataScript({
  course,
}: {
  course: CourseData;
}): React.JSX.Element {
  const jsonLd = generateCourseStructuredData({
    ...course,
    outcomes: course.outcomes || [],
  });
  return <JsonLdScript data={jsonLd} />;
}
