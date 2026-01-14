'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { BookOpen, Star, ArrowRight } from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { Icon } from '@/shared/components/common/icons';
import { cn } from '@/shared/lib/utils';
import { getLevelStyle } from './styles';

// -----------------------------------------------------------------------------
// Simplified CourseCard - Clean, minimal, no expansion
// Clicking the card goes directly to course detail page
// -----------------------------------------------------------------------------

interface CourseCardProps {
  course: CourseData;
}

export const CourseCard = memo(function CourseCard({
  course,
}: CourseCardProps) {
  const hasDetailPage = course.hasDetailPage === true;
  const coursePath = `/teaching/${course.institution
    .toLowerCase()
    .replace(/\s+/g, '')}/${course.code.toLowerCase().replace(/\s+/g, '')}`;

  const cardContent = (
    <Card
      className={cn(
        'p-4 transition-all duration-200 group',
        hasDetailPage &&
          'cursor-pointer hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Course Icon */}
        <div className="bg-primary/10 p-2 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
          {course.iconName ? (
            <Icon name={course.iconName} className="w-5 h-5 text-primary" />
          ) : (
            <BookOpen className="w-5 h-5 text-primary" />
          )}
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                {course.code}
              </p>
            </div>

            {/* Arrow indicator for clickable cards */}
            {hasDetailPage && (
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            )}
          </div>

          {/* Compact meta row */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge
              variant="secondary"
              className={cn('text-xs py-0 px-1.5', getLevelStyle(course.level))}
            >
              {course.level}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {course.semester} {course.year}
            </span>
            {typeof course.rating === 'number' && (
              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {course.rating}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  if (hasDetailPage) {
    return <Link href={coursePath}>{cardContent}</Link>;
  }

  return cardContent;
});
