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
          </div>

          {/* Action Bar: Primary CTA + Rich Stats Grid */}
          <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
            {/* Primary CTA */}
            <div className="flex-shrink-0">
              <Button
                size="lg"
                asChild
                className="h-14 px-8 text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
              >
                <Link href="/research">
                  Explore Research <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Rich Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="group relative flex flex-col p-4 rounded-xl bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <stat.icon className="w-5 h-5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                  </div>
                  <div className="text-sm font-semibold text-foreground/90 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 whitespace-pre-line leading-snug">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
