
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { samplePublications } from '@/lib/data/publications';
import { siteConfig } from '@/config/site';
import { BackToTop } from '@/components/back-to-top';
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper';

const PublicationList = dynamic(() => import('@/components/publication-list').then(mod => mod.PublicationList), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <SkeletonWrapper isLoading className="h-24 w-full" /> {/* Filter section skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonWrapper isLoading key={i} className="h-[280px] w-full" />
        ))}
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Publications & Research',
  description: `Explore Md Asif Bin Khaled's scholarly articles, conference papers, and ongoing research in Explainable AI and Multimodal AI for healthcare.`,
  keywords: [...siteConfig.keywords, 'academic publications', 'research papers', 'conference papers', 'IEEE', 'Springer', 'journal articles'],
  alternates: {
    canonical: `${siteConfig.url}/publications`,
  },
};

export default function PublicationsPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Publications & Research
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A collection of my published works and research contributions.
        </p>
      </header>

      <section id="publication-listing">
        <PublicationList initialPublications={samplePublications} />
      </section>
      
      <BackToTop />
    </div>
  );
}

    