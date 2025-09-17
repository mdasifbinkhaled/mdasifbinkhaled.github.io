import type { Metadata } from 'next';
import { samplePublications } from '@/shared/lib/data/publications';
import { siteConfig } from '@/shared/config/site';
import { BackToTop } from '@/shared/components/common/back-to-top';
import { PublicationListClient } from '@/shared/components/common/publication-list-client';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

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
        <PublicationListClient initialPublications={samplePublications} />
      </section>

      <BackToTop />
    </div>
  );
}
