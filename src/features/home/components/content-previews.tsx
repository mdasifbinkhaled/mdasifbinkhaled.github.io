import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PublicationList } from '@/shared/components/common/publication-list';
import { ExperienceCompact } from '@/shared/components/common/experience-compact';
import { samplePublications } from '@/shared/lib/data/publications';
import { professionalExperiences } from '@/shared/lib/data/experience';
import { DISPLAY_LIMITS } from '@/shared/config';
import { researchData } from '@/shared/lib/data/research';

/**
 * Publications Preview Section
 * Shows recent publications with link to full list
 */
export function PublicationsPreview() {
  const filteredPublications = samplePublications.filter(
    (p) => p.type !== 'In Progress' && p.type !== 'Thesis'
  );

  return (
    <section className="w-full py-8 md:py-10 bg-secondary/10">
      <div className="container-responsive">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Recent Publications
          </h2>
          <PublicationList
            initialPublications={filteredPublications.slice(
              0,
              DISPLAY_LIMITS.HOMEPAGE_RECENT
            )}
          />
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/publications">
                View All Publications <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Experience Preview Section
 * Shows recent work experience with link to full timeline
 */
export function ExperiencePreview() {
  const recentExperiences = professionalExperiences.slice(
    0,
    DISPLAY_LIMITS.HOMEPAGE_RECENT
  );

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container-responsive">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Work Experience
          </h2>
          <ExperienceCompact experiences={recentExperiences} />
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/experience">
                View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Featured Grant Section
 * Highlights primary research grant
 */
export function FeaturedGrant() {
  const grant =
    researchData.grants.find((g) => g.featured) || researchData.grants[0];

  if (!grant) return null;

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-responsive">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Featured Research Grant
        </h2>
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 max-w-3xl mx-auto border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">{grant.title}</CardTitle>
            <CardDescription className="text-base">
              {grant.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{grant.description}</p>
            <Button variant="outline" asChild className="mt-2">
              <Link href="/research">
                View All Research Projects{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
