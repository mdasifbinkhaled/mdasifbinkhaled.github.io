'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Card, CardHeader } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  BookOpen,
  Star,
  Users,
  Calendar,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { Icon } from '@/shared/components/common/icons';
import { cn } from '@/shared/lib/utils';
import { getLevelStyle } from './styles';

interface CourseCardProps {
  course: CourseData;
  variant?: 'static' | 'collapsible'; // Kept for backward compat but ignored
  showDetails?: boolean; // Kept for backward compat but ignored
}

export const CourseCard = memo(function CourseCard({
  course,
}: CourseCardProps) {
  const hasDetailPage = course.hasDetailPage === true;
  const coursePath = `/teaching/${course.institution
    .toLowerCase()
    .replace(/\s+/g, '')}/${course.code.toLowerCase().replace(/\s+/g, '')}`;

  const enrollmentDisplay =
    typeof course.enrollmentCount === 'number'
      ? `${course.enrollmentCount} students`
      : 'Enrollment TBD';

  // Common content for both variants
  const CardContent = (
    <Card
      className={cn(
        'h-full transition-all duration-300 flex flex-col',
        hasDetailPage
          ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 cursor-pointer group bg-card'
          : 'bg-muted/10 border-border/60'
      )}
    >
      <CardHeader className="space-y-4 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* Course Icon */}
            <div
              className={cn(
                'p-2.5 rounded-xl shrink-0 transition-colors',
                hasDetailPage
                  ? 'bg-primary/10 group-hover:bg-primary/20'
                  : 'bg-muted group-hover:bg-muted'
              )}
            >
              {course.iconName ? (
                <Icon
                  name={course.iconName}
                  className={cn(
                    'w-5 h-5',
                    hasDetailPage ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
              ) : (
                <BookOpen
                  className={cn(
                    'w-5 h-5',
                    hasDetailPage ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
              )}
            </div>

            {/* Title & Code */}
            <div>
              <h3
                className={cn(
                  'font-bold text-lg leading-tight transition-colors',
                  hasDetailPage
                    ? 'group-hover:text-primary'
                    : 'text-foreground/90'
                )}
              >
                {course.title}
              </h3>
              <p className="font-mono text-sm text-muted-foreground mt-1">
                {course.code}
              </p>
            </div>
          </div>

          {/* Interaction Hint */}
          {hasDetailPage && (
            <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className={cn('text-xs font-medium', getLevelStyle(course.level))}
          >
            {course.level.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {course.semester} {course.year}
          </Badge>
        </div>

        {/* Static Card Bonus Content: Technologies */}
        {/* Only show this for STATIC cards to give them "weight" and value */}
        {!hasDetailPage &&
          course.technologies &&
          course.technologies.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {course.technologies.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-[10px] px-1.5 h-5 bg-background/50 text-muted-foreground border-border/50"
                  >
                    {tech}
                  </Badge>
                ))}
                {course.technologies.length > 3 && (
                  <span className="text-[10px] text-muted-foreground self-center pl-1">
                    +{course.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
      </CardHeader>

      {/* Stats Footer (Always present) */}
      <div className="px-6 pb-6 pt-0 mt-auto">
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className="text-xs">{enrollmentDisplay}</span>
          </div>
          {/* Only show rating for detailed courses or if explicitly high */}
          {hasDetailPage && typeof course.rating === 'number' && (
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{course.rating}/5.0</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            <GraduationCap className="w-4 h-4" />
            <span className="text-xs">{course.credits} Cr</span>
          </div>
        </div>
      </div>
    </Card>
  );

  if (hasDetailPage) {
    return (
      <Link href={coursePath} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return <div className="block h-full">{CardContent}</div>;
});
