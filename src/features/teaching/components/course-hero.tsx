import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/common/icons';
import { ContestCountdown } from '@/features/teaching/components/contest-countdown';
import type { CourseData } from '@/shared/types';

import { cn } from '@/shared/lib/utils';
import { getCourseLinkIcon } from '@/shared/lib/course-utils';

// Helper to get icon for link type - MOVED to shared/lib/course-utils

export function CourseHero({ course }: { course: CourseData }) {
  // Sort links: Primary (Site, Discord) vs Content (Slides, Outline, etc.)
  const primaryLinks =
    course.links?.filter((l) => ['site', 'discord'].includes(l.type)) || [];
  const contentLinks =
    course.links?.filter((l) => !['site', 'discord'].includes(l.type)) || [];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-background">
      {/* Background Decorator - Ensure low Z-index */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-8">
          {/* Icon */}
          <div className="bg-primary/5 p-6 rounded-2xl shrink-0 border border-primary/10 shadow-sm">
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
                <span className="text-border">|</span>
                <span className="text-muted-foreground text-sm">
                  {course.institution}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {course.title}
              </h1>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/50">
                  <GraduationCap className="w-4 h-4" />
                  {course.credits} Credits
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/50">
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full animate-pulse',
                      course.status === 'ongoing'
                        ? 'bg-success'
                        : 'bg-muted-foreground'
                    )}
                  />
                  {course.status === 'ongoing' ? 'Active Course' : 'Completed'}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/50">
                  <span className="capitalize">{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contest Countdown - Separate styled section */}
        {course.status === 'ongoing' && course.activeContest && (
          <div className="mt-8 rounded-xl relative z-20">
            <ContestCountdown contest={course.activeContest} />
          </div>
        )}

        {/* Quick Access Box - Styled for Consistency */}
        {(primaryLinks.length > 0 || contentLinks.length > 0) && (
          <div className="mt-6 rounded-xl border border-border/60 bg-muted/10 p-6 shadow-sm relative z-20">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Quick Access
            </h3>
            <div className="flex flex-wrap gap-3">
              {course.links?.map((link, idx) => {
                const LinkIcon = getCourseLinkIcon(link.type);
                const isHighlight = ['site', 'discord'].includes(link.type);
                return (
                  <Button
                    key={idx}
                    variant={isHighlight ? 'default' : 'secondary'}
                    className={cn(
                      'shadow-sm hover:shadow-md transition-all rounded-lg h-10 px-5 cursor-pointer relative z-30',
                      !isHighlight &&
                      'bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground border border-border/50'
                    )}
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon
                        className={cn(
                          'w-4 h-4 mr-2',
                          !isHighlight && 'text-primary'
                        )}
                      />
                      {link.title}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Consultation Hours - Only for ongoing courses */}
        {course.status === 'ongoing' && (
          <div className="mt-6 rounded-xl border border-border/60 bg-muted/10 p-6 shadow-sm relative z-20">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Consultation Hours
            </h3>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Office:</span>
                <span className="font-medium">BC5010 - D</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border/50" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Hours:</span>
                <span className="font-medium">
                  Mon & Wed, 2:40 PM - 4:10 PM
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border/50" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium">{siteConfig.phone}</span>
              </div>
              <span className="text-xs text-muted-foreground italic ml-auto">
                Please make an appointment before visiting.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
