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

/**
 * Hero Section Component
 * Main landing section with introduction, quick stats, and CTAs
 */
export function HeroSection() {
  // Stats data with unique IDs for stable React keys
  const stats = [
    {
      id: 'stat-years',
      number: '7+',
      label: 'Years',
      icon: GraduationCap,
      description: 'Teaching',
    },
    {
      id: 'stat-score',
      number: '4.0',
      label: 'Score',
      icon: Target,
      description: '/5.0',
    },
    {
      id: 'stat-grants',
      number: '4',
      label: 'Grants',
      icon: TrendingUp,
      description: 'Awarded',
    },
    {
      id: 'stat-areas',
      number: '5+',
      label: 'Areas',
      icon: Brain,
      description: 'Focus',
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-br from-background via-secondary/10 to-primary/5 relative overflow-hidden">
      <div className="container-responsive">
        <div className="max-w-5xl">
          {/* Header Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-primary">
              {siteConfig.author}
            </h1>
            <p className="text-xl text-foreground/80 md:text-2xl font-medium">
              {siteConfig.jobTitle}
            </p>
            <p className="text-muted-foreground md:text-lg max-w-2xl leading-relaxed">
              Specializing in Explainable AI (XAI) and Multimodal AI (MMAI) for
              healthcare diagnostics and analytics.
            </p>

            {/* Philosophy & Status */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm text-foreground/80 pt-2">
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="italic">
                  "{researchIdentity.philosophy.statement}"
                </span>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Open to PhD Opportunities
              </div>
            </div>
          </div>

          {/* Action Bar: Buttons + Stats */}
          <div className="flex flex-col xl:flex-row gap-8 xl:items-center">
            {/* Buttons Group */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button
                size="lg"
                asChild
                className="h-14 px-8 text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all"
              >
                <Link href="/research">
                  Explore Research <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-14 px-8 text-lg border-2 hover:bg-secondary/50 transition-all"
              >
                <Link href={siteConfig.links.cv} target="_blank">
                  View CV <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden xl:block h-12 w-px bg-border/50"></div>

            {/* Stats Group - Inline */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-auto">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xl leading-none">
                      {stat.number}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profiles Footer */}
          <div className="mt-12 pt-6 border-t border-border/40">
            <AcademicProfiles variant="horizontal" showLabels />
          </div>
        </div>
      </div>
    </section>
  );
}
