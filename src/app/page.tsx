import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { siteConfig, DISPLAY_LIMITS } from '@/shared/config';
import { researchIdentity } from '@/shared/config/researcher-profile';
import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  BookUser,
  Globe,
  Award,
  Brain,
  Target,
  TrendingUp,
  Activity,
  Leaf,
  Satellite,
  Eye,
  Code2,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { samplePublications } from '@/shared/lib/data/publications';
import { professionalExperiences } from '@/shared/lib/data/experience';
import { PublicationList } from '@/shared/components/common/publication-list';
import { ExperienceCompact } from '@/shared/components/common/experience-compact';
import { AcademicProfiles } from '@/shared/components/academic-profiles';

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
      date: '[2025/03]',
      text: 'Successfully defended research proposal for ',
      highlight: 'Bangla Dialect Detection',
      description: " project funded by VC's Research Fund at IUB.",
    },
    {
      date: '[2025/01]',
      text: 'Awarded Principal Investigator role for ',
      highlight: 'Unveiling the Linguistic Diversity of Bangla',
      description: ' (VCRF-SETS:24-013) research grant.',
    },
    {
      date: '[2024/09]',
      text: 'Promoted to Senior Lecturer at Independent University, Bangladesh (IUB).',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section - Optimized for first viewport */}
      <section className="w-full py-6 lg:py-8 bg-gradient-to-br from-background via-secondary/20 to-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl w-full">
          <div className="space-y-4">
            {/* Top Section: Full Width */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl xl:text-4xl text-primary">
                {siteConfig.author}
              </h1>
              <p className="text-lg text-foreground sm:text-xl lg:text-xl">
                Senior Lecturer & Researcher
              </p>
              <p className="text-sm text-muted-foreground sm:text-base lg:text-lg max-w-prose">
                Specializing in Explainable AI (XAI) and Multimodal AI (MMAI)
                for healthcare diagnostics and analytics.
              </p>

              {/* Research Philosophy - Compact */}
              <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 my-3">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-primary mb-0.5">
                    Research Philosophy
                  </p>
                  <p className="text-xs text-foreground italic leading-relaxed sm:text-sm">
                    "{researchIdentity.philosophy.statement}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Flex Layout with Stats Cards */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
              {/* Left: Bottom Content */}
              <div className="flex-1 space-y-3 min-w-0 lg:min-w-[280px] lg:max-w-[320px]">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-3 py-1.5 text-xs rounded-full font-semibold shadow-md border border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Open to PhD Opportunities
                </div>

                {/* Academic Profiles */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Academic Profiles:
                  </p>
                  <AcademicProfiles
                    primaryOnly
                    variant="horizontal"
                    showLabels={false}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:flex-row pt-2">
                  <Button
                    size="default"
                    asChild
                    className="px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Link href="/research">
                      Explore Research{' '}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    asChild
                    className="px-4 py-2 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-sm"
                  >
                    <Link
                      href={siteConfig.links.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View CV <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Quick Stats - Single Row */}
              <div className="w-full lg:flex-1 lg:min-w-0 overflow-hidden">
                <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:gap-2.5 lg:gap-2">
                  {[
                    {
                      number: '7+',
                      label: 'Years Teaching',
                      icon: GraduationCap,
                      color: 'text-blue-500 dark:text-blue-400',
                      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
                      borderColor: 'border-blue-500/20',
                      description: '6+ full-time, 1.8 part-time',
                    },
                    {
                      number: '4.0+',
                      label: 'Teaching Score',
                      icon: Target,
                      color: 'text-green-500 dark:text-green-400',
                      bgColor: 'bg-green-500/10 hover:bg-green-500/20',
                      borderColor: 'border-green-500/20',
                      description: 'Out of 5.0',
                    },
                    {
                      number: '4',
                      label: 'Research Grants',
                      icon: TrendingUp,
                      color: 'text-purple-500 dark:text-purple-400',
                      bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
                      borderColor: 'border-purple-500/20',
                      description: 'Successfully awarded',
                    },
                    {
                      number: '5+',
                      label: 'Research Areas',
                      icon: Brain,
                      color: 'text-orange-500 dark:text-orange-400',
                      bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
                      borderColor: 'border-orange-500/20',
                      description: 'Active focus areas',
                    },
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className={`backdrop-blur border ${stat.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 ${stat.bgColor} group flex-1 min-w-[calc(50%-4px)] sm:min-w-[140px] lg:min-w-0 lg:flex-[1_1_0%] lg:shrink`}
                    >
                      <CardContent className="p-2 sm:p-2.5 lg:p-2 xl:p-2.5 text-center flex flex-col justify-center">
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 mx-auto mb-1 rounded-lg ${stat.bgColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                        >
                          <stat.icon
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 ${stat.color}`}
                          />
                        </div>
                        <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-foreground mb-0.5">
                          {stat.number}
                        </div>
                        <div className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-0.5">
                          {stat.label}
                        </div>
                        {'description' in stat && (
                          <div className="text-[9px] sm:text-[10px] text-muted-foreground/80 mt-0.5 leading-tight">
                            {stat.description}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section - Compact */}
      <section className="w-full py-4 lg:py-6 bg-gradient-to-br from-secondary/30 via-secondary/20 to-transparent">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            News
          </h2>
          <div className="space-y-2">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 text-xs sm:text-sm p-2.5 rounded-lg bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-md"
              >
                <span className="font-semibold text-primary/80 whitespace-nowrap px-2 py-0.5 rounded bg-primary/10 text-xs">
                  {item.date}
                </span>
                <div className="flex-1">
                  <span className="text-foreground">{item.text}</span>
                  {item.highlight && (
                    <span className="text-primary font-semibold">
                      {item.highlight}
                    </span>
                  )}
                  {item.description && (
                    <span className="text-foreground">{item.description}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests - Expanded */}
      <section className="w-full py-[var(--space-section-md)]">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-lg)] text-primary">
            Research Interests
          </h2>
          <div className="grid gap-[var(--space-card-default)] md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-6 h-6 text-red-500" />
                  <CardTitle className="text-xl">AI in Healthcare</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Developing AI-powered diagnostic systems for disease
                  detection, medical imaging analysis, and clinical decision
                  support to improve patient outcomes and healthcare delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="w-6 h-6 text-green-500" />
                  <CardTitle className="text-xl">AI in Environment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Applying machine learning to environmental monitoring, climate
                  modeling, ecosystem conservation, and sustainable resource
                  management for a greener future.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-6 h-6 text-blue-500" />
                  <CardTitle className="text-xl">
                    Explainable AI (XAI)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Creating transparent AI systems that clinicians and users can
                  trust. Focus on interpretable models for critical applications
                  with clear reasoning and decision pathways.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-6 h-6 text-purple-500" />
                  <CardTitle className="text-xl">Multimodal AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Integrating imaging, text, clinical records, and sensor data
                  for comprehensive analysis. Building systems that leverage
                  diverse data modalities for holistic insights.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Satellite className="w-6 h-6 text-orange-500" />
                  <CardTitle className="text-xl">Remote Sensing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Analyzing satellite, drone, and aerial imagery for land use
                  classification, disaster monitoring, agricultural assessment,
                  and environmental change detection.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-amber-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code2 className="w-6 h-6 text-amber-500" />
                  <CardTitle className="text-xl">
                    Algorithms & Data Structures
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Researching efficient sorting, searching, and optimization
                  algorithms. Exploring novel data structures and computational
                  approaches for solving complex problems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="w-full py-[var(--space-section-sm)] bg-secondary/10">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
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
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
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
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
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
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-[var(--space-card-default)] text-primary">
            Connect & Collaborate
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Interested in collaboration, discussing research opportunities, or
            learning more about my work? Let&apos;s connect!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
                  href={siteConfig.links.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-teal-500/10 rounded-full group-hover:bg-teal-500/20 transition-colors">
                    <Globe className="w-8 h-8 text-teal-500" />
                  </div>
                  <span className="font-semibold text-sm">ResearchGate</span>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <a
                  href={siteConfig.links.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-green-600/10 rounded-full group-hover:bg-green-600/20 transition-colors">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <span className="font-semibold text-sm">ORCID</span>
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
                  <div className="p-4 bg-rose-500/10 rounded-full group-hover:bg-rose-500/20 transition-colors">
                    <Mail className="w-8 h-8 text-rose-500" />
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
