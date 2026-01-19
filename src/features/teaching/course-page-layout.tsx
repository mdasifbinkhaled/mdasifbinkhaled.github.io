'use client';

import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Target,
  Layers,
  Award,
  Code2,
  FileText,
  Video,
  MessageCircle,
  Globe,
  ExternalLink,
  Presentation,
  BookOpenText,
} from 'lucide-react';
import type { CourseData, CourseLink } from '@/shared/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';

import { Icon } from '@/shared/components/common/icons';

// =============================================================================
// COURSE PAGE LAYOUT - World-Class Teaching Portal Design
// =============================================================================

interface CoursePageLayoutProps {
  course: CourseData;
}

// Helper to get icon for link type
function getLinkIcon(type: CourseLink['type']) {
  switch (type) {
    case 'outline':
      return FileText;
    case 'slides':
      return Presentation;
    case 'video':
      return Video;
    case 'discord':
      return MessageCircle;
    case 'site':
      return Globe;
    case 'problem-set':
      return Code2;
    case 'note':
      return BookOpenText;
    case 'other':
    default:
      return ExternalLink;
  }
}

// -----------------------------------------------------------------------------
// Hero Section - Gradient header with course info + Back button
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Course Hero - Minimalist & Organized
// -----------------------------------------------------------------------------
function CourseHero({ course }: { course: CourseData }) {
  // Sort links: Primary (Site, Discord) vs Content (Slides, Outline, etc.)
  const primaryLinks =
    course.links?.filter((l) => ['site', 'discord'].includes(l.type)) || [];
  const contentLinks =
    course.links?.filter((l) => !['site', 'discord'].includes(l.type)) || [];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-12">
          {/* Icon */}
          <div className="bg-primary/5 p-6 rounded-2xl shrink-0 border border-primary/10">
            {course.iconName ? (
              <Icon name={course.iconName} className="w-12 h-12 text-primary" />
            ) : (
              <BookOpen className="w-12 h-12 text-primary" />
            )}
          </div>

          <div className="flex-1 space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-primary font-semibold tracking-wider text-sm uppercase">
                  {course.code}
                </span>
                <span className="text-border">|</span>
                <span className="text-muted-foreground text-sm">
                  {course.semester} {course.year}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {course.description}
              </p>
            </div>

            {/* Quick Stats Row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/50">
                <GraduationCap className="w-4 h-4" />
                {course.credits} Credits
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/50">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {course.status === 'ongoing' ? 'Active Course' : 'Completed'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Bar - Separated & Organized */}
        {(primaryLinks.length > 0 || contentLinks.length > 0) && (
          <div className="border-t border-b border-border/40 py-8">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 px-1">
              Quick Access
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Primary Destinations */}
              {primaryLinks.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {primaryLinks.map((link, idx) => {
                    const LinkIcon = getLinkIcon(link.type);
                    return (
                      <Button
                        key={idx}
                        variant="default"
                        className="shadow-none rounded-lg h-10 px-5"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noreferrer">
                          <LinkIcon className="w-4 h-4 mr-2" />
                          {link.title}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Separator for larger screens */}
              {primaryLinks.length > 0 && contentLinks.length > 0 && (
                <div className="hidden md:block w-px bg-border/50 self-stretch" />
              )}

              {/* Resource Links */}
              {contentLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 flex-1">
                  {contentLinks.map((link, idx) => {
                    const LinkIcon = getLinkIcon(link.type);
                    return (
                      <Button
                        key={idx}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground border border-border/50 shadow-sm rounded-lg h-10 px-5 font-medium transition-all"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noreferrer">
                          <LinkIcon className="w-4 h-4 mr-2 text-primary" />
                          {link.title}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Vertical Section Layout (Replaces Tabs)
// -----------------------------------------------------------------------------
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
      <div className="h-1 w-12 bg-primary/20 mt-4 rounded-full" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Overview Tab - Objectives & Outcomes
// -----------------------------------------------------------------------------
function OverviewSection({ course }: { course: CourseData }) {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-2">
      {course.objectives && course.objectives.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Objectives
            </h3>
            <ul className="space-y-3">
              {course.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5 shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {obj}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {course.outcomes && course.outcomes.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Expected Outcomes
            </h3>
            <ul className="space-y-3">
              {course.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-green-500/10 rounded-full p-1 mt-0.5 shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Syllabus Tab - Topics & Assessment
// -----------------------------------------------------------------------------
function SyllabusSection({ course }: { course: CourseData }) {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
      {course.topics && course.topics.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Course Topics
            </h3>
            <div className="grid gap-2">
              {course.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span className="bg-primary text-primary-foreground w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base">{topic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {course.assessment && (
        <Card className="border-primary/20">
          <CardContent className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Assessment Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(course.assessment).map(([key, value]) => {
                // Properly capitalize assessment labels (e.g., "midterm" -> "Midterm")
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{label}</span>
                      <span className="font-semibold text-sm">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Resources Tab - Technologies & Tools (The Friendly Hub)
// -----------------------------------------------------------------------------
function ResourcesSection({ course }: { course: CourseData }) {
  // Separate Video Lectures from other resources for the "Hybrid" layout
  const videoSection = course.resourceSections?.find((r) =>
    r.title.includes('Video')
  );
  const toolSections =
    course.resourceSections?.filter((r) => !r.title.includes('Video')) || [];

  return (
    <div className="space-y-16">
      {/* 1. Technologies & Assignments Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {course.technologies && course.technologies.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-muted/60"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 2. Assignments & Projects */}
        <div className="space-y-6">
          {(course.assignments?.length ?? 0) > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Evaluation Types
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {course.assignments?.map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {item}
                  </span>
                ))}
                {course.projects?.map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Curated Resources Hub (Exposed Grid) */}
      {toolSections.length > 0 && (
        <div className="pt-8 border-t border-border/40">
          <SectionHeader
            title="Learning Hub"
            subtitle="Curated tools and libraries to accelerate your mastery."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {toolSections.map((section, idx) => {
              if (!section) return null;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const sectionTitle =
                ((section as any)?.title || '').split('(')[0].trim() ||
                'Resources';
              const sectionItems = section?.items || [];

              return (
                <div
                  key={idx}
                  className="flex flex-col gap-4 p-6 rounded-xl bg-muted/20 border border-border/40 hover:border-primary/20 transition-colors"
                >
                  <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground">
                    {idx === 0 ? (
                      <Target className="w-5 h-5 text-primary" />
                    ) : idx === 1 ? (
                      <Code2 className="w-5 h-5 text-primary" />
                    ) : (
                      <BookOpenText className="w-5 h-5 text-primary" />
                    )}
                    {sectionTitle}
                  </h4>
                  <div className="space-y-3 flex-1">
                    {sectionItems.map((item, itemIdx) => (
                      <div key={itemIdx}>
                        {item.url ? (
                          <Button
                            variant="secondary"
                            asChild
                            className="h-auto w-full justify-start p-3 whitespace-normal text-left bg-background hover:bg-background/80 hover:shadow-sm border border-transparent hover:border-primary/10 transition-all group"
                          >
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex flex-col gap-1 w-full">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {item.label}
                                  </span>
                                  <ExternalLink className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {item.description && (
                                  <span className="text-xs text-muted-foreground font-normal line-clamp-2">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            </a>
                          </Button>
                        ) : (
                          <div className="p-3 rounded-md bg-background/50 border border-border/20">
                            <span className="font-medium text-sm text-foreground/90 block">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="text-xs text-muted-foreground mt-1 block">
                                {item.description}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Video Archives (Accordion Style for Density) */}
      {videoSection && (
        <div className="pt-8 border-t border-border/40">
          <SectionHeader
            title="Video Archives"
            subtitle="Previous semester recordings and external lectures."
          />
          <div className="max-w-4xl mx-auto md:mx-0 md:max-w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="videos"
                className="border border-border/40 rounded-xl px-0 bg-muted/20 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <Video className="w-5 h-5 text-primary" />
                    Explore {videoSection?.items?.length || 0} Video Collections
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pk-0">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-6 bg-background/50 border-t border-border/40">
                    {videoSection.items.map((item, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        asChild
                        className="h-auto flex-col items-start gap-2 p-4 border-border/40 hover:border-primary/30 hover:bg-background bg-card shadow-sm"
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="flex items-center justify-between w-full">
                            <Video className="w-4 h-4 text-primary" />
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <span className="font-semibold text-foreground text-left line-clamp-2 leading-tight">
                            {item.label}
                          </span>
                          <span className="text-xs text-muted-foreground font-normal text-left line-clamp-3">
                            {item.description}
                          </span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Feedback Tab - Student Testimonials (Hidden if empty, simplified)
// -----------------------------------------------------------------------------
function FeedbackSection({ course }: { course: CourseData }) {
  if (!course.feedback || course.feedback.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {course.feedback.map((fb, idx) => (
        <Card key={idx} className="border-border/40 bg-muted/20">
          <CardContent className="p-6">
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              &ldquo;{fb}&rdquo;
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CoursePageLayout({ course }: CoursePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <CourseHero course={course} />

      {/* Main Content - Vertical Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24">
          <SectionHeader
            title="Course Overview"
            subtitle="Objectives, outcomes, and what you'll learn."
          />
          <OverviewSection course={course} />
        </section>

        {/* Syllabus Section */}
        <section id="syllabus" className="scroll-mt-24">
          <SectionHeader
            title="Syllabus"
            subtitle="Topics covered and assessment breakdown."
          />
          <SyllabusSection course={course} />
        </section>

        {/* Resources Section */}
        <section id="resources" className="scroll-mt-24">
          <SectionHeader
            title="Resources"
            subtitle="Tools, books, and reference materials."
          />
          <ResourcesSection course={course} />
        </section>

        {/* Feedback Section (Optional) */}
        {course.feedback && course.feedback.length > 0 && (
          <section
            id="feedback"
            className="scroll-mt-24 border-t border-border/40 pt-16"
          >
            <SectionHeader title="Student Feedback" />
            <FeedbackSection course={course} />
          </section>
        )}
      </div>
    </div>
  );
}
