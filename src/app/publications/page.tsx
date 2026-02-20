import type { Metadata } from 'next';
import { samplePublications } from '@/shared/lib/data/publications';
import { siteConfig } from '@/shared/config/site';
import { PublicationList } from '@/shared/components/common/publication-list';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { ErrorBoundary } from '@/shared/components/common/error-boundary';
import { AcademicProfiles } from '@/shared/components/common/academic-profiles';

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
    canonical: '/publications',
  },
  other: {
    // Google Scholar explicit indexing parameters
    citation_title: 'Publications & Research Archive',
    citation_author: siteConfig.author,
    citation_publication_date: new Date().getFullYear().toString(),
    citation_journal_title: 'Academic Portfolio',
    citation_pdf_url: `${siteConfig.url}/cv/CV_Md_Asif_Bin_Khaled.pdf`,
  },
};

export default function PublicationsPage() {
  return (
    <div className="container-responsive space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <Breadcrumbs />

        <header className="text-center">
          <h1 className="text-fluid-heading font-bold tracking-tight text-primary pb-1">
            Publications & Research
          </h1>
          <p className="mt-4 text-fluid-lg leading-8 text-muted-foreground">
            A comprehensive archive of my scholarly articles, conference papers,
            and contributions to the scientific community.
          </p>
        </header>

        {/* Academic Profiles */}
        <section className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Academic Profiles
            </h2>
            <p className="text-muted-foreground">
              Find my complete publication record on these platforms
            </p>
          </div>
          <AcademicProfiles variant="grid" />
        </section>

        <section id="publication-listing">
          <ErrorBoundary
            fallback={
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Unable to load publications at this time. Please try again
                  later.
                </p>
              </div>
            }
          >
            <PublicationList initialPublications={samplePublications} />
          </ErrorBoundary>
        </section>
      </div>
    </div>
  );
}
