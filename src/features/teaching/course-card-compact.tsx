'use client';

import Link from 'next/link';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { Calendar, ChevronRight } from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { cn } from '@/shared/lib/utils';
import { getCoursePath } from '@/shared/lib/course-utils';
import { getLevelStyle } from './styles';

interface CourseCardCompactProps {
  course: CourseData;
}

export function CourseCardCompact({ course }: CourseCardCompactProps) {
  // Use tier field (detailed = has separate page)
  const hasDetailPage = course.tier === 'detailed';
  const coursePath = getCoursePath(course);

  const content = (
    <Card className="h-full border-border/40 hover:border-primary/50 transition-all hover:shadow-sm bg-card/50 backdrop-blur-sm">
      <div className="p-4 flex items-center justify-between gap-4">
        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-medium text-primary/80">
              {course.code}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                'text-10px px-1.5 h-5',
                getLevelStyle(course.level)
              )}
            >
              {course.level.toUpperCase()}
            </Badge>
          </div>

          <h3 className="font-semibold text-sm leading-tight truncate pr-2">
            {course.title}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {course.semester} {course.year}
            </div>
            {course.credits && <span>• {course.credits} Cr</span>}
          </div>
        </div>

        {/* Action / Visual Cue */}
        {hasDetailPage && (
          <div className="flex-shrink-0 text-muted-foreground/30 group-hover:text-primary transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </Card>
  );

  if (hasDetailPage) {
    return (
      <Link href={coursePath} className="block h-full group">
        {content}
      </Link>
    );
  }

  return <div className="block h-full">{content}</div>;
}
