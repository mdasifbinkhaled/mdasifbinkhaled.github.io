'use client';

import { CheckCircle2, Circle, Lock, Trash2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import type { PlannerCourse } from './types';

interface CoursePlanGridProps {
  groupedCourses: Array<{ label: string; courses: PlannerCourse[] }>;
  completedIds: Set<string>;
  unlockedIds: Set<string>;
  codeById: Map<string, string>;
  onToggleComplete: (id: string) => void;
  onRemoveCourse: (id: string) => void;
}

export function CoursePlanGrid({
  groupedCourses,
  completedIds,
  unlockedIds,
  codeById,
  onToggleComplete,
  onRemoveCourse,
}: CoursePlanGridProps) {
  if (groupedCourses.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-12 text-center text-muted-foreground">
          <p className="text-lg font-medium">No courses yet</p>
          <p className="text-sm mt-1">
            Load a preset or add courses manually to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {groupedCourses.map(({ label, courses: groupCourses }) => (
        <div key={label}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {label}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groupCourses.map((course) => {
              const isCompleted = completedIds.has(course.id);
              const isUnlocked = unlockedIds.has(course.id);
              const isLocked = !isCompleted && !isUnlocked;

              return (
                <Card
                  key={course.id}
                  aria-disabled={isLocked || undefined}
                  className={`transition-all motion-reduce:transition-none ${
                    isCompleted
                      ? 'border-success/40 bg-success/5'
                      : isUnlocked
                        ? 'border-primary/30 bg-primary/5'
                        : 'opacity-60'
                  }`}
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-sm font-bold">
                          {course.code}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {course.title}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[10px] shrink-0"
                      >
                        {course.credits}cr
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 pt-0">
                    {course.prerequisites.length > 0 && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Requires:{' '}
                        {course.prerequisites
                          .map((pid) => codeById.get(pid) ?? pid)
                          .join(', ')}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-2 text-xs"
                        disabled={isLocked}
                        onClick={() => onToggleComplete(course.id)}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-success-emphasis mr-1" />
                            Done
                          </>
                        ) : isUnlocked ? (
                          <>
                            <Circle className="h-3.5 w-3.5 mr-1" />
                            Mark Done
                          </>
                        ) : (
                          <>
                            <Lock className="h-3.5 w-3.5 mr-1" />
                            Locked
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 ml-auto text-muted-foreground hover:text-destructive"
                        onClick={() => onRemoveCourse(course.id)}
                        aria-label={`Remove ${course.code}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
