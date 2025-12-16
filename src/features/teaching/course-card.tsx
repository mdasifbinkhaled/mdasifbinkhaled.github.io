'use client';

import Link from 'next/link';
import { useState, memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Users,
  BookOpen,
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { CourseData, CourseStatus } from '@/shared/types';
import { institutionNames } from '@/shared/lib/data/courses';
import { Icon } from '@/shared/components/common/icons';
import { DISPLAY_LIMITS } from '@/shared/config';
import { cn } from '@/shared/lib/utils';

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

// Style helpers (extracted as const to avoid recreation)
const LEVEL_STYLES = {
  undergraduate:
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  graduate:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
} as const;

const STATUS_STYLES = {
  completed:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  ongoing:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
} as const;

function getLevelStyle(level: CourseData['level']) {
  return (
    LEVEL_STYLES[level as keyof typeof LEVEL_STYLES] ||
    LEVEL_STYLES.undergraduate
  );
}

function getStatusStyle(status: CourseStatus) {
  return (
    STATUS_STYLES[status as keyof typeof STATUS_STYLES] ||
    STATUS_STYLES.completed
  );
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
                <span className="capitalize text-muted-foreground">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
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
  const institutionLabel =
    institutionNames[course.institution] ?? course.institution;

  const hasDetailPage = course.hasDetailPage === true;
  const coursePath = `/teaching/${course.institution
    .toLowerCase()
    .replace(/\s+/g, '')}/${course.code.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-lg',
        isCollapsible && 'break-inside-avoid inline-block w-full min-h-[260px]',
        hasDetailPage &&
          'border-2 border-primary/50 hover:border-primary hover:-translate-y-1'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* Course Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-full">
                {course.iconName ? (
                  <Icon
                    name={course.iconName}
                    className="w-5 h-5 text-primary"
                  />
                ) : (
                  <BookOpen className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg leading-tight">
                  {course.title}
                </CardTitle>
                <p className="text-sm font-mono text-primary">{course.code}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={getLevelStyle(course.level)}>
                {course.level.toUpperCase()}
              </Badge>
              {course.status && (
                <Badge className={getStatusStyle(course.status)}>
                  {course.status.toUpperCase()}
                </Badge>
              )}
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
                'text-sm text-muted-foreground',
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
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {institutionLabel}
              </div>
              {typeof course.rating === 'number' && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {course.rating}/5.0
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons (collapsible variant only) */}
          {isCollapsible && (
            <div className="flex flex-col items-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 py-1"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={`course-${course.id}-details`}
              >
                {open ? (
                  <>
                    Hide <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Details <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              {hasDetailPage && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 px-2 py-1"
                >
                  <Link href={coursePath}>Visit</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      {/* Expandable Details */}
      {((isCollapsible && open) || (!isCollapsible && showDetails)) && (
        <CardContent id={`course-${course.id}-details`} className="pt-0">
          <CourseDetails course={course} />
        </CardContent>
      )}
    </Card>
  );
});

// Re-export legacy names for backward compatibility during migration
export const CollapsibleCourseCard = CourseCard;
export const SimpleCourseCard = memo(function SimpleCourseCardCompat({
  course,
  showFullDetails = false,
}: {
  course: CourseData;
  showFullDetails?: boolean;
}) {
  return (
    <CourseCard
      course={course}
      variant="static"
      showDetails={showFullDetails}
    />
  );
});
