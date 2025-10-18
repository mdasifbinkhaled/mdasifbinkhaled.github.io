import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { siteConfig, DISPLAY_LIMITS } from '@/shared/config';
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Users,
  Quote,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  BookUser,
} from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { samplePublications } from '@/shared/lib/data/publications';
import { professionalExperiences } from '@/shared/lib/data/experience';
import { PublicationList } from '@/shared/components/common/publication-list';
import { ExperienceCompact } from '@/shared/components/common/experience-compact';

export default function HomePage() {
  const filteredPublications = samplePublications.filter(
    (p) => p.type !== 'In Progress' && p.type !== 'Thesis'
  );

  // Get recent experiences (current and latest)
  const recentExperiences = professionalExperiences.slice(
    0,
    DISPLAY_LIMITS.HOMEPAGE_RECENT
  );

  return (
    <div className="flex flex-col items-center">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="w-full py-[var(--space-section-md)] bg-gradient-to-br from-background via-secondary/20 to-primary/5 relative overflow-hidden">
        <div className="hero-container">
          <div className="hero-grid">
            {/* Content Section */}
            <div className="hero-content">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-4xl xl:text-5xl/tight text-primary">
                  {siteConfig.author}
                </h1>
                <p className="text-xl text-foreground md:text-xl lg:text-xl">
                  Senior Lecturer & Researcher
                </p>
                <p className="text-muted-foreground md:text-lg max-w-prose">
                  Specializing in Explainable AI (XAI) and Multimodal AI (MMAI)
                  for healthcare diagnostics and analytics.
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-4 py-2 text-sm rounded-full font-semibold my-2 shadow-md border border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Open to PhD Opportunities
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row pt-4">
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

          {/* Brief Bio Section - NEW */}
          <div className="mt-[var(--space-section-sm)] max-w-3xl mx-auto text-center">
            <p className="text-lg text-foreground/90 leading-relaxed">
              I am a dedicated researcher and educator with expertise in
              developing{' '}
              <span className="font-semibold text-primary">
                trustworthy AI systems
              </span>{' '}
              for healthcare. My work focuses on creating interpretable machine
              learning models that bridge the gap between cutting-edge
              technology and real-world clinical applications, while maintaining
              transparency and accountability in AI-driven medical
              decision-making.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-card-sm)] text-center mt-[var(--space-section-sm)] max-w-4xl mx-auto">
            {[
              {
                number: '15+',
                label: 'Publications',
                icon: BookOpen,
                color: 'text-blue-500 dark:text-blue-400',
                bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
                borderColor: 'border-blue-500/20',
              },
              {
                number: '100+',
                label: 'Citations',
                icon: Quote,
                color: 'text-green-500 dark:text-green-400',
                bgColor: 'bg-green-500/10 hover:bg-green-500/20',
                borderColor: 'border-green-500/20',
              },
              {
                number: '5+',
                label: 'Years Teaching',
                icon: GraduationCap,
                color: 'text-purple-500 dark:text-purple-400',
                bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
                borderColor: 'border-purple-500/20',
              },
              {
                number: '1000+',
                label: 'Students Taught',
                icon: Users,
                color: 'text-orange-500 dark:text-orange-400',
                bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
                borderColor: 'border-orange-500/20',
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className={`backdrop-blur border ${stat.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 ${stat.bgColor}`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-lg ${stat.bgColor} flex items-center justify-center transition-all duration-300`}
                  >
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests - Condensed */}
      <section className="w-full py-[var(--space-section-md)]">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-lg)] text-primary">
            Research Interests
          </h2>
          <div className="grid gap-[var(--space-card-default)] md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Explainable AI (XAI)</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Developing transparent AI systems for healthcare that
                  clinicians and patients can trust. Focus on interpretable
                  models for disease detection and diagnosis with clear
                  reasoning.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  Multimodal AI & Computer Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Integrating imaging, clinical records, and lab results for
                  holistic diagnostics. Creating comprehensive tools that
                  leverage diverse data modalities for personalized healthcare.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="w-full py-[var(--space-section-sm)] bg-secondary/10">
        <div className="container-responsive">
          <h2 className="text-2xl font-bold mb-[var(--space-card-sm)] text-primary">
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
      </section>

      {/* Work Experience Section */}
      <section className="w-full py-[var(--space-section-sm)]">
        <div className="container-responsive">
          <h2 className="text-2xl font-bold mb-[var(--space-card-sm)] text-primary">
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
      </section>

      {/* Featured Grant - Single Highlight */}
      <section className="w-full py-[var(--space-section-md)] bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-lg)] text-primary">
            Featured Research Grant
          </h2>
          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 max-w-3xl mx-auto border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">
                Unveiling the Linguistic Diversity of Bangla
              </CardTitle>
              <CardDescription className="text-base">
                Principal Investigator, VC&apos;s Research Fund 2024-2025 (No.
                VCRF-SETS:24-013)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Leading research on enhancing dialect detection through AI and
                Machine Learning techniques, contributing to the preservation
                and understanding of Bangladesh&apos;s rich linguistic heritage.
              </p>
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

      {/* Connect & Follow - Academic Profiles */}
      <section className="w-full py-[var(--space-section-md)]">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-default)] text-primary">
            Connect & Collaborate
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Interested in collaboration, discussing research opportunities, or
            learning more about my work? Let&apos;s connect!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <a
                  href={siteConfig.links.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
                    <BookUser className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="font-semibold text-sm">Google Scholar</span>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors">
                    <Github className="w-8 h-8 text-purple-500" />
                  </div>
                  <span className="font-semibold text-sm">GitHub</span>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-indigo-500/10 rounded-full group-hover:bg-indigo-500/20 transition-colors">
                    <Linkedin className="w-8 h-8 text-indigo-500" />
                  </div>
                  <span className="font-semibold text-sm">LinkedIn</span>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                    <Mail className="w-8 h-8 text-green-500" />
                  </div>
                  <span className="font-semibold text-sm">Email</span>
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/contact">
                Get in Touch <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
