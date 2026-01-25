import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config';
import { researchIdentity } from '@/shared/config/researcher-profile';
import { getGlobalAverageRating } from '@/shared/lib/data/evaluations';
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
import {
  getYearsExperience,
  RESEARCH_METRICS,
} from '@/shared/lib/data/aggregators';

/**
 * Hero Section Component
 * Main landing section with introduction, quick stats, and CTAs
 * Modern design with ambient backgrounds and glassmorphism
 */
export function HeroSection() {
  // Stats data with unique IDs for stable React keys
  const stats = [
    {
      id: 'stat-years',
      number: getYearsExperience(),
      suffix: '+',
      label: 'Years Experience',
      icon: <GraduationCap className="h-6 w-6" />,
      description: 'Teaching & Research\nin Academia',
    },
    {
      id: 'stat-score',
      number: getGlobalAverageRating(),
      suffix: '/5.0',
      decimals: 2,
      label: 'Student Eval',
      icon: <Target className="h-6 w-6" />,
      description: 'Average Score\n(out of 5.0)',
    },
    {
      id: 'stat-grants',
      number: RESEARCH_METRICS.GRANTS_COUNT,
      label: 'Research Grants',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Awarded as PI/Co-PI',
    },
    {
      id: 'stat-areas',
      number: RESEARCH_METRICS.AREAS_COUNT,
      suffix: '+',
      label: 'Research Areas',
      icon: <Brain className="h-6 w-6" />,
      description: 'Multimedia & XAI\nFocus',
    },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      {/* Removed cluttering center blobs for cleaner text contrast */}

      <div className="container-responsive relative z-10 py-2">
        <div className="max-w-5xl">
          {/* Header Content */}
          <div className="space-y-6 mb-8">
            {/* Name with Accent */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Welcome to my academic portfolio</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {siteConfig.author}
              </h1>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <p className="text-lg text-foreground md:text-xl font-semibold">
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
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={stat.label}
                icon={stat.icon}
                description={stat.description}
                variant="glass"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
