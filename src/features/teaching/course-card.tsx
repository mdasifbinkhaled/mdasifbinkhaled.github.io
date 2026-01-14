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

  return (
    <Link
      href={hasDetailPage ? coursePath : '#'}
      className={cn('block h-full', !hasDetailPage && 'pointer-events-none')}
    >
      <Card
        className={cn(
          'h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
          hasDetailPage && 'hover:border-primary/50 cursor-pointer group'
        )}
      >
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {/* Course Icon */}
              <div className="bg-primary/10 p-2.5 rounded-xl shrink-0 group-hover:bg-primary/20 transition-colors">
                {course.iconName ? (
                  <Icon
                    name={course.iconName}
                    className="w-5 h-5 text-primary"
                  />
                ) : (
                  <BookOpen className="w-5 h-5 text-primary" />
                )}
              </div>

              {/* Title & Code */}
              <div>
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground mt-1">
                  {course.code}
                </p>
              </div>
            </div>

            {/* Arrow Icon */}
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

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span className="text-xs">{enrollmentDisplay}</span>
            </div>
            {typeof course.rating === 'number' && (
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
        </CardHeader>
      </Card>
    </Link>
  );
});
