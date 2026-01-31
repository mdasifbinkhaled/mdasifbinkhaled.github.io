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
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import type {
  CourseData,
  CourseLink,
  CourseResourceSection,
} from '@/shared/types';
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
import { ScheduleTable } from '@/features/teaching/components/schedule-table';
import { NoticeBoard } from '@/features/teaching/components/notice-board';
import { ContestCountdown } from '@/features/teaching/components/contest-countdown';
import { SyllabusTable } from '@/features/teaching/components/syllabus-table';

import { ExamSchedule } from '@/features/teaching/components/exam-schedule';

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

              {/* Quick Stats Row (Restoring this as it's useful metadata in Hero) */}
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

            {/* Contest Countdown Widget - Only for Ongoing Courses */}
            {course.status === 'ongoing' && course.activeContest && (
              <div className="pt-4">
                <ContestCountdown contest={course.activeContest} />
              </div>
            )}
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
// REUSABLE COLLAPSIBLE SECTION COMPONENT (Systematic Standardization)
// -----------------------------------------------------------------------------
interface CollapsibleSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('mb-8', className)}>
      <Card
        className={cn(
          'border-primary/20 overflow-hidden shadow-sm transition-all duration-300',
          isOpen ? 'shadow-md' : 'shadow-sm'
        )}
      >
        <div
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors select-none group',
            !isOpen && 'border-b-0',
            isOpen && 'border-b'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-muted-foreground transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </div>

        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <CardContent className="p-0">{children}</CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Overview Section (Standardized)
// -----------------------------------------------------------------------------
function OverviewSection({ course }: { course: CourseData }) {
  return (
    <CollapsibleSection title="Course Overview" icon={BookOpenText}>
      <Accordion
        type="multiple"
        defaultValue={['description', 'objectives', 'outcomes']}
        className="w-full"
      >
        <AccordionItem value="description" className="border-b px-6">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
            Course Description
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
            {course.description}
          </AccordionContent>
        </AccordionItem>

        {course.objectives && course.objectives.length > 0 && (
          <AccordionItem value="objectives" className="border-b px-6">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary/80" />
                Learning Objectives
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <ul className="space-y-3">
                {course.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5 shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{obj}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {course.outcomes && course.outcomes.length > 0 && (
          <AccordionItem value="outcomes" className="px-6 border-b-0">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary/80" />
                Expected Outcomes
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
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
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </CollapsibleSection>
  );
}

// -----------------------------------------------------------------------------
// Syllabus Section (Standardized)
// -----------------------------------------------------------------------------
function SyllabusSection({ course }: { course: CourseData }) {
  // Determine if we have content to show
  const hasContent =
    (course.weeklyModules && course.weeklyModules.length > 0) ||
    (course.topics && course.topics.length > 0);

  if (!hasContent) return null;

  return (
    <CollapsibleSection title="Syllabus & Schedule" icon={Layers}>
      <div className="p-6">
        {/* Assessment Breakdown (if available) - Kept visible inside the section */}
        {course.assessment && (
          <div className="mb-8 p-6 bg-muted/30 rounded-xl border border-border/40">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Assessment Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(course.assessment).map(([key, value]) => {
                if (typeof value !== 'number' || value <= 0) return null;
                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium text-muted-foreground">
                        {key}
                      </span>
                      <span className="font-bold">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Class Schedule Table - Restored */}
        {course.classSchedule && course.classSchedule.length > 0 && (
          <div className="mb-8">
            <ScheduleTable schedule={course.classSchedule} />
          </div>
        )}

        {/* Syllabus Table (Weekly Components) */}
        {course.weeklyModules && course.weeklyModules.length > 0 ? (
          <SyllabusTable modules={course.weeklyModules} />
        ) : (
          /* Fallback: Simple Topics List */
          course.topics &&
          course.topics.length > 0 && (
            <Card className="border-border/40 bg-muted/20">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold mb-4">Course Topics</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {course.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        )}

        {/* Exam Schedule - Restored */}
        {course.exams && (
          <div className="mt-8 border-t border-border/40 pt-8">
            <ExamSchedule exams={course.exams} />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}

// -----------------------------------------------------------------------------
// Resources Section (Standardized)
// -----------------------------------------------------------------------------
function ResourcesSection({ course }: { course: CourseData }) {
  const videoSection = course.resourceSections?.find((r) =>
    r.title.includes('Video')
  );
  const toolSections =
    course.resourceSections?.filter(
      (r): r is CourseResourceSection =>
        r !== null && r !== undefined && !r.title.includes('Video')
    ) || [];

  const hasContent = videoSection || toolSections.length > 0;

  if (!hasContent) return null;

  return (
    <CollapsibleSection title="Resources & Tools" icon={Globe}>
      <div className="p-6 space-y-8">
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

        {/* 3. Curated Resources Hub */}
        {toolSections.length > 0 && (
          <div className="pt-8 border-t border-border/40">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Hub
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {toolSections.map(
                (section: CourseResourceSection | undefined, idx: number) => {
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  const safeSection = section as any;
                  const sectionTitle =
                    (safeSection.title || '').split('(')[0].trim() ||
                    'Resources';
                  const sectionItems = safeSection.items || [];
                  /* eslint-enable @typescript-eslint/no-explicit-any */

                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-4 p-5 rounded-xl bg-muted/20 border border-border/40 hover:border-primary/20 transition-colors"
                    >
                      <h4 className="font-semibold text-base text-foreground">
                        {sectionTitle}
                      </h4>
                      <div className="space-y-3 flex-1">
                        {sectionItems.map(
                          (
                            item: {
                              label: string;
                              url?: string;
                              description?: string;
                            },
                            itemIdx: number
                          ) => (
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
                          )
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* 4. Video Archives */}
        {videoSection && (
          <div className="pt-8 border-t border-border/40">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Video Archives
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="videos"
                className="border border-border/40 rounded-xl px-0 bg-muted/20 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
                  <span className="text-base font-medium">
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
                        </a>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </CollapsibleSection>
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
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <CourseHero course={course} />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Notice Board Section */}
        {course.status === 'ongoing' && course.notices && (
          <CollapsibleSection title="Notice Board" icon={MessageCircle}>
            <div className="p-6">
              <NoticeBoard notices={course.notices} />
            </div>
          </CollapsibleSection>
        )}

        {/* Overview Section */}
        <OverviewSection course={course} />

        {/* Syllabus Section - Now Standardized */}
        <SyllabusSection course={course} />

        {/* Resources Section - Now Standardized */}
        <ResourcesSection course={course} />

        {/* Feedback Section - If any */}
        {(course.feedback?.length ?? 0) > 0 && (
          <CollapsibleSection
            title="Student Feedback"
            icon={MessageCircle}
            defaultOpen={false}
          >
            <div className="p-6">
              <FeedbackSection course={course} />
            </div>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}
