import type { Metadata } from 'next';
import { samplePublications } from '@/shared/lib/data/publications';
import { siteConfig } from '@/shared/config/site';
import { PublicationList } from '@/shared/components/common/publication-list';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';
import { researchIdentity } from '@/shared/config/researcher-profile';
import { AcademicProfiles } from '@/shared/components/academic-profiles';
import { Card, CardContent } from '@/shared/components/ui/card';
import { BookOpen, Sparkles, HeartPulse } from 'lucide-react';

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
          {researchIdentity.philosophy.statement}
        </p>
      </header>

      {/* Research Areas Context */}
      <section className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Research Focus Areas
          </h2>
          <p className="text-muted-foreground">
            My publications span across these interconnected research domains
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {researchIdentity.primaryAreas.map((area, index) => {
            const iconComponents = {
              0: BookOpen,
              1: Sparkles,
              2: HeartPulse,
            };
            const IconComponent =
              iconComponents[index as keyof typeof iconComponents];
            return (
              <Card
                key={area.id}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {area.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

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
  );
}
