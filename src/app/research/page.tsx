import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  Eye,
  Layers,
  Lightbulb,
  BookOpen,
  Code,
  ExternalLink,
  AlertCircle,
  Target,
  Telescope,
  ArrowRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import {
  researchIdentity,
  researchProjects,
  academicProfiles,
} from '@/shared/config/researcher-profile';
import { AcademicProfiles } from '@/shared/components/academic-profiles';

export const metadata: Metadata = {
  title: 'Research',
  description: `${siteConfig.author}'s research in Explainable AI, Healthcare AI, and Multimodal AI. ${researchIdentity.philosophy.statement}`,
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: `Research - ${siteConfig.author}`,
    description: researchIdentity.philosophy.statement,
    images: [assetPaths.ogImage],
  },
};

const iconMap = {
  Heart,
  Eye,
  Layers,
  Lightbulb,
  BookOpen,
  Code,
};

export default function ResearchPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lightbulb className="h-4 w-4" />
          <span>Research Philosophy</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-gradient">
          Breaking Out of the Black Box
        </h1>

        <p className="text-xl md:text-2xl text-foreground font-medium max-w-4xl mx-auto">
          {researchIdentity.philosophy.statement}
        </p>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {researchIdentity.philosophy.approach}
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">XAI</div>
            <div className="text-sm text-muted-foreground">Core Focus</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">Healthcare</div>
            <div className="text-sm text-muted-foreground">Primary Domain</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">Multimodal</div>
            <div className="text-sm text-muted-foreground">AI Approach</div>
          </div>
        </div>

        {/* Academic Profiles */}
        <div className="pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Find my research profiles:
          </p>
          <AcademicProfiles
            primaryOnly
            variant="horizontal"
            className="justify-center"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-4xl mx-auto">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Research Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              {researchIdentity.philosophy.vision}
            </p>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Why It Matters</p>
                <p className="text-sm text-muted-foreground">
                  In healthcare, AI decisions can mean life or death. When a
                  model predicts stroke risk or diagnoses a disease, doctors and
                  patients need to understand WHY—not just trust a black box. My
                  research ensures AI systems are transparent, trustworthy, and
                  accountable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Primary Research Areas */}
      <section id="research-areas">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            Primary Research Areas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My work spans three interconnected domains, all focused on making AI
            understandable and beneficial for humanity
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {researchIdentity.primaryAreas.map((area) => {
            const Icon = iconMap[area.icon as keyof typeof iconMap];
            return (
              <Card
                key={area.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{area.name}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {area.keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="text-xs"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Current Focus */}
      <section className="max-w-4xl mx-auto">
        <Card className="border-2 border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Telescope className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Current Research Focus</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary">
                Primary Focus
              </h3>
              <p className="text-lg">{researchIdentity.currentFocus.primary}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Research Domains</h3>
              <div className="flex flex-wrap gap-2">
                {researchIdentity.currentFocus.domains.map((domain) => (
                  <Badge key={domain} variant="outline" className="text-sm">
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Methodology: {researchIdentity.currentFocus.methodology}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Research Projects */}
      <section id="research-projects">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            Featured Research Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In-depth explorations of AI applications in healthcare and beyond
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-1">
          {researchProjects.featured.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{project.status}</Badge>
                      <Badge variant="secondary">{project.domain}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-primary font-medium">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-6 space-y-4">
                <p className="text-lg leading-relaxed">{project.description}</p>

                {project.placeholder && (
                  <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg border border-border">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">
                        Detailed Information Coming Soon
                      </p>
                      <p className="text-muted-foreground">
                        Comprehensive project details including methodologies,
                        results, and code repositories will be added here.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Impact:</span>{' '}
                    {'impact' in project ? project.impact : 'To be detailed'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Source Libraries */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            Open Source Contributions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building tools for the research community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {researchIdentity.libraries.map((library) => (
            <Card
              key={library.name}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>{library.name}</CardTitle>
                  </div>
                  <Badge variant="outline">{library.status}</Badge>
                </div>
                <CardDescription>{library.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={library.github} target="_blank">
                    View on GitHub <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Research Goals */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Looking Ahead</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Long-term Vision
              </h3>
              <p className="text-lg">{researchIdentity.goals.longTerm}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Impact Goal
              </h3>
              <p className="text-lg">{researchIdentity.goals.impact}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-2xl font-bold">Explore My Research Further</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="group">
            <Link href="/publications">
              View Publications
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={academicProfiles.github.url} target="_blank">
              <Code className="mr-2 h-4 w-4" />
              GitHub Projects
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
