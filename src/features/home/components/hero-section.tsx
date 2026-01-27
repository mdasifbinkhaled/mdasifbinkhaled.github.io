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
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '@/shared/components/common/stat-card';

/**
 * Hero Section Component
 * Main landing section with introduction, quick stats, and CTAs
 * World-class design with ambient backgrounds and glassmorphism
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
    <section className="w-full relative overflow-hidden">
      {/* Ambient Background - World-Class Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[25vw] h-[25vw] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[20vw] h-[20vw] bg-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container-responsive relative z-10 py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Content */}
          <div className="space-y-6 mb-8">
            {/* Name with Accent */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Welcome to my academic portfolio</span>
              </div>
              <h1 className="text-fluid-heading font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pb-1">
                {siteConfig.author}
              </h1>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <p className="text-xl text-foreground md:text-2xl font-semibold">
                {siteConfig.jobTitle}
              </p>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
                Specializing in{' '}
                <span className="text-foreground font-medium">
                  Explainable AI (XAI)
                </span>{' '}
                and{' '}
                <span className="text-foreground font-medium">
                  Multimodal AI (MMAI)
                </span>{' '}
                for healthcare diagnostics and analytics.
              </p>
            </div>

            {/* Philosophy & Status Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Philosophy Badge */}
              <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 shadow-sm">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80 italic">
                  "{researchIdentity.philosophy.statement}"
                </span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <Link href="/research">
                  Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 text-base border-primary/30 hover:bg-primary/5 hover:scale-[1.02] transition-all"
              >
                <Link href="/teaching">View Teaching Portfolio</Link>
              </Button>
            </div>
          </div>

          {/* Rich Stats Grid - Glassmorphism Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                number={stat.number}
                label={stat.label}
                icon={stat.icon}
                description={stat.description}
                variant="spotlight"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
