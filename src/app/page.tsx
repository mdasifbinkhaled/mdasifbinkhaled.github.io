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
  Search,
  Quote,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { AcademicSearch } from '@/features/academic/academic-search';
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

  // News items (recent achievements and announcements)
  const newsItems = [
    {
      date: '[2025/04]',
      text: 'Excited to announce the launch of ',
      highlight: 'Llama 4',
      description:
        ", a major leap in open-source AI! As part of the team supporting Llama 4 at FAIR, I'm proud to have contributed to these cutting-edge models! 🚀",
    },
    {
      date: '[2025/02]',
      text: '3D-MVP, MM-Graph and 3D-GRAND are accepted at CVPR 2025!',
    },
    {
      date: '[2024/10]',
      text: "We're looking for research interns starting next year working on embodied agents and multimodal LLMs.",
      strikethrough:
        'If you are interested, please drop me an email and apply here.',
    },
  ];

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
                number: '200+',
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

      {/* News Section */}
      <section className="w-full py-[var(--space-section-sm)] bg-gradient-to-br from-secondary/30 via-secondary/20 to-transparent">
        <div className="container-responsive">
          <h2 className="text-2xl font-bold mb-[var(--space-card-default)] text-primary flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            News
          </h2>
          <div className="space-y-3">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 text-sm p-3 rounded-lg bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-md"
              >
                <span className="font-semibold text-primary/80 whitespace-nowrap px-2 py-1 rounded bg-primary/10">
                  {item.date}
                </span>
                <div className="flex-1">
                  <span className="text-foreground">{item.text}</span>
                  {item.highlight && (
                    <a
                      href="#"
                      className="text-primary hover:underline font-semibold hover:text-primary/80 transition-colors"
                    >
                      {item.highlight}
                    </a>
                  )}
                  {item.description && (
                    <span className="text-foreground">{item.description}</span>
                  )}
                  {item.strikethrough && (
                    <span className="line-through text-muted-foreground ml-1 opacity-60">
                      {item.strikethrough}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Search */}
      <section className="w-full py-[var(--space-section-sm)]">
        <div className="container-responsive">
          <Card className="overflow-hidden shadow-lg border-primary/20 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Search className="w-5 h-5" />
                </div>
                Explore My Academic Work
              </CardTitle>
              <CardDescription className="text-foreground/70">
                Search through publications, courses, research projects, and
                teaching materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AcademicSearch
                content={[
                  {
                    id: '1',
                    title: 'Explainable AI for Healthcare Diagnostics',
                    type: 'publication',
                    content:
                      'Research on interpretable machine learning models for medical diagnosis',
                    tags: ['AI', 'Healthcare', 'Machine Learning'],
                    year: 2024,
                    url: '/publications',
                  },
                  {
                    id: '2',
                    title: 'Advanced Machine Learning',
                    type: 'course',
                    content:
                      'Graduate course covering deep learning and neural networks',
                    tags: ['Teaching', 'Machine Learning', 'Deep Learning'],
                    year: 2024,
                    url: '/teaching',
                  },
                ]}
                placeholder="Search publications, courses, research areas..."
                maxResults={6}
              />
            </CardContent>
          </Card>
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

      {/* Research Interests */}
      <section className="w-full py-[var(--space-section-md)]">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-lg)] text-primary">
            Research Interests
          </h2>
          <div className="grid gap-[var(--space-card-default)] md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Explainable AI (XAI)</CardTitle>
                <CardDescription>
                  Ensuring transparency and trustworthiness in disease
                  detection, diagnosis, and healthcare analytics utilizing
                  Artificial Intelligence (AI).
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Developing AI systems that can explain their reasoning,
                  crucial for healthcare applications where understanding the
                  &ldquo;why&rdquo; behind a diagnosis is essential for
                  clinician trust and patient safety.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  Multimodal AI (MMAI) & Computer Vision (CV)
                </CardTitle>
                <CardDescription>
                  Using Multimodal AI (MMAI) and Computer Vision (CV) to combine
                  imaging, clinical records, and lab results for holistic
                  diagnostics.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Integrating diverse data modalities to create comprehensive
                  diagnostic tools that leverage both visual and non-visual
                  medical data for more accurate and personalized healthcare
                  insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Publications Section */}
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

      {/* Grants and Highlight */}
      <section className="w-full py-[var(--space-section-md)]">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-lg)] text-primary">
            Recent Grants
          </h2>
          <div className="grid gap-[var(--space-card-sm)] md:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">
                  Development and Analysis of a Comprehensive Sorting Algorithm
                  Library
                </CardTitle>
                <CardDescription className="text-sm">
                  Principal Investigator, Sponsored Research Projects 2024-2025
                  (No. 2024-SETS-06)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Focused on enhancing computational efficiency through
                  optimized sorting algorithms.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  Unveiling the Linguistic Diversity of Bangla
                </CardTitle>
                <CardDescription className="text-sm">
                  Principal Investigator, VC&apos;s Research Fund 2024-2025 (No.
                  VCRF-SETS:24-013)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Enhancing dialect detection through AI and Machine Learning
                  techniques.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Seeking PhD Opportunities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              With a strong foundation in XAI and MMAI research, I am actively
              seeking doctoral programs to further contribute to innovative and
              trustworthy AI systems, particularly in healthcare.
            </p>
            <Button asChild>
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
