'use client';

import Link from 'next/link';
import { useState, memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Users,
  BookOpen,
  Star,
  Calendar,
  TrendingUp,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { Icon } from '@/shared/components/common/icons';
import { DISPLAY_LIMITS } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import { getLevelStyle } from './styles';

// -----------------------------------------------------------------------------
// Unified CourseCard component
// Replaces: CollapsibleCourseCard + SimpleCourseCard (reduces duplication)
// -----------------------------------------------------------------------------

interface CourseCardProps {
  course: CourseData;
  /** Controls the card behavior variant */
  variant?: 'collapsible' | 'static';
  /** If true, show expanded details section (static only) */
  showDetails?: boolean;
  /** Initial open state (collapsible only) */
  defaultOpen?: boolean;
}

// Helper function to capitalize assessment labels
function formatAssessmentLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Course details section (shared between variants)
function CourseDetails({ course }: { course: CourseData }) {
  return (
    <div className="space-y-4">
      {course.objectives && course.objectives.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Learning Objectives
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {course.objectives.map((objective) => (
              <li key={objective} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {objective}
              </li>
            ))}
          </ul>
        </div>
      )}

      {course.technologies && course.technologies.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {course.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {course.assessment && (
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Assessment
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(course.assessment).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">
                  {formatAssessmentLabel(key)}:
                </span>
                <span className="font-medium">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {course.feedback && course.feedback.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <Award className="w-3 h-3" />
            Student Feedback
          </h4>
          <div className="space-y-1">
            {course.feedback
              .slice(0, DISPLAY_LIMITS.COURSE_FEEDBACK)
              .map((feedback) => (
                <p
                  key={feedback}
                  className="text-xs text-muted-foreground italic"
                >
                  &ldquo;{feedback}&rdquo;
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const CourseCard = memo(function CourseCard({
  course,
  variant = 'collapsible',
  showDetails = false,
  defaultOpen = false,
}: CourseCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const isCollapsible = variant === 'collapsible';

  const enrollmentDisplay =
    typeof course.enrollmentCount === 'number'
      ? `${course.enrollmentCount} students`
      : 'Enrollment TBD';

  const hasDetailPage = course.hasDetailPage === true;
  const coursePath = `/teaching/${course.institution
    .toLowerCase()
    .replace(/\s+/g, '')}/${course.code.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <Card
      className={cn(
        'transition-all duration-200 flex flex-col group',
        isCollapsible && 'break-inside-avoid inline-block w-full min-h-64',
        hasDetailPage
          ? 'border-2 border-primary/30 hover:border-primary hover:shadow-lg hover:-translate-y-1'
          : 'bg-muted/5 hover:bg-muted/10'
      )}
    >
      <CardHeader className="pb-3 flex-1">
        <div className="flex items-start gap-3">
          {/* Course Icon */}
          <div className="bg-primary/10 p-2 rounded-full shrink-0">
            {course.iconName ? (
              <Icon name={course.iconName} className="w-5 h-5 text-primary" />
            ) : (
              <BookOpen className="w-5 h-5 text-primary" />
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg leading-tight">
                {course.title}
              </CardTitle>
              {/* Visual indicator for detail pages */}
              {hasDetailPage && (
                <ArrowRight className="w-4 h-4 text-primary/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              )}
            </div>
            <p className="text-sm font-mono text-primary">{course.code}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge className={getLevelStyle(course.level)}>
            {course.level.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {course.semester} {course.year}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {course.credits} Credits
          </Badge>
        </div>

        {/* Description */}
        <p
          className={cn(
            'text-sm text-muted-foreground mt-3',
            isCollapsible && 'line-clamp-3'
          )}
        >
          {course.description}
        </p>

        {/* Quick Stats */}
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {enrollmentDisplay}
          </div>
          {typeof course.rating === 'number' && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {course.rating}/5.0
            </div>
          )}
        </div>

        {/* Inline Tech Tags for cards without detail pages */}
        {!hasDetailPage &&
          course.technologies &&
          course.technologies.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <div className="flex flex-wrap gap-1">
                {course.technologies.slice(0, 4).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-5 bg-background/50"
                  >
                    {tech}
                  </Badge>
                ))}
                {course.technologies.length > 4 && (
                  <span className="text-[10px] text-muted-foreground self-center">
                    +{course.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
      </CardHeader>

      {/* Expandable Details */}
      {((isCollapsible && open) || (!isCollapsible && showDetails)) && (
        <CardContent id={`course-${course.id}-details`} className="pt-0">
          <CourseDetails course={course} />
        </CardContent>
      )}

      {/* Action Buttons - Now at the bottom */}
      {isCollapsible && (
        <CardFooter className="pt-0 pb-4 flex gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`course-${course.id}-details`}
          >
            {open ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show Details
              </>
            )}
          </Button>

          {hasDetailPage && (
            <Button
              variant="default"
              size="sm"
              asChild
              className="flex-1 sm:flex-none"
            >
              <Link href={coursePath}>
                <ExternalLink className="w-4 h-4 mr-1" />
                View Course
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
});
