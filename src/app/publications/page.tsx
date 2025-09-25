import type { Metadata } from 'next';
import { samplePublications } from '@/shared/lib/data/publications';
import { siteConfig } from '@/shared/config/site';
import { PublicationList } from '@/shared/components/common/publication-list';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';

export const metadata: Metadata = {
  title: 'Publications & Research',
  description: `Explore Md Asif Bin Khaled's scholarly articles, conference papers, and ongoing research in Explainable AI and Multimodal AI for healthcare.`,
  keywords: [
    ...siteConfig.keywords,
    'academic publications',
    'research papers',
    'conference papers',
    'IEEE',
    'Springer',
    'journal articles',
  ],
  alternates: {
    canonical: `${siteConfig.url}/publications`,
  },
};

export default function PublicationsPage() {
  return (
    <div className="space-y-12">
      <Breadcrumbs />

      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Publications & Research
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A collection of my published works and research contributions.
        </p>
      </header>

      <section id="publication-listing">
        <ErrorBoundary
          fallback={
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Unable to load publications at this time. Please try again later.
              </p>
            </div>
          }
        >
          <PublicationList initialPublications={samplePublications} />
        </ErrorBoundary>
      </section>
    </div>
  );
}
