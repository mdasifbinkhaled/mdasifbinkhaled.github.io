import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config';
import { researchIdentity } from '@/shared/config/researcher-profile';
import {
  ArrowRight,
  GraduationCap,
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';

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
      label: 'Years Experience',
      icon: GraduationCap,
      description: 'Teaching & Research\nin Academia',
    },
    {
      id: 'stat-score',
      number: '4.0',
      label: 'Student Eval',
      icon: Target,
      description: 'Average Score\n(out of 5.0)',
    },
    {
      id: 'stat-grants',
      number: '4',
      label: 'Research Grants',
      icon: TrendingUp,
      description: 'Awarded as PI/Co-PI',
    },
    {
      id: 'stat-areas',
      number: '5+',
      label: 'Research Areas',
      icon: Brain,
      description: 'Multimedia & XAI\nFocus',
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

            {/* Primary CTA */}
            <div className="pt-4">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-base shadow-md hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
              >
                <Link href="/research">
                  Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Rich Stats Grid - Full Width */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="group relative flex flex-col p-5 rounded-xl bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl font-bold text-primary tracking-tight">
                    {stat.number}
                  </div>
                  <div className="p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-foreground/90 uppercase tracking-wide text-[0.8rem]">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
