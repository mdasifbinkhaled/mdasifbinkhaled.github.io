import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config';
import { researchIdentity } from '@/shared/config/researcher-profile';
import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { AcademicProfiles } from '@/shared/components/academic-profiles';
import { StatCard } from '@/shared/components/common/stat-card';

/**
 * Hero Section Component
 * Main landing section with introduction, quick stats, and CTAs
 */
export function HeroSection() {
  // Stats data with unique IDs for stable React keys
  const stats = [
    {
      id: 'stat-years-teaching',
      number: '7+',
      label: 'Years Teaching',
      icon: GraduationCap,
      description: '6+ full-time, 1.8 part-time',
    },
    {
      id: 'stat-teaching-score',
      number: '4.0+',
      label: 'Teaching Score',
      icon: Target,
      description: 'Out of 5.0',
    },
    {
      id: 'stat-research-grants',
      number: '4',
      label: 'Research Grants',
      icon: TrendingUp,
      description: 'Successfully awarded',
    },
    {
      id: 'stat-research-areas',
      number: '5+',
      label: 'Research Areas',
      icon: Brain,
      description: 'Active focus areas',
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-background via-secondary/20 to-primary/5 relative overflow-hidden">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-4xl xl:text-5xl/tight text-primary">
                {siteConfig.author}
              </h1>
              <p className="text-xl text-foreground md:text-xl lg:text-xl">
                {siteConfig.jobTitle}
              </p>
              <p className="text-muted-foreground md:text-lg max-w-prose">
                Specializing in Explainable AI (XAI) and Multimodal AI (MMAI)
                for healthcare diagnostics and analytics.
              </p>

              {/* Research Philosophy */}
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 my-4">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary mb-1">
                    Research Philosophy
                  </p>
                  <p className="text-sm text-foreground italic leading-relaxed">
                    "{researchIdentity.philosophy.statement}"
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-4 py-2 text-sm rounded-full font-semibold shadow-md border border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Open to PhD Opportunities
              </div>

              {/* Academic Profiles */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Academic Profiles:
                </p>
                <AcademicProfiles
                  primaryOnly
                  variant="horizontal"
                  showLabels={false}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
              <Button
                size="lg"
                asChild
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/research">
                  Explore Research{' '}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Link
                  href={siteConfig.links.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View CV <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
