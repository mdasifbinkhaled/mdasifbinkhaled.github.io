'use client';

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

interface CollapsibleCourseCardProps {
  course: CourseData;
  defaultOpen?: boolean;
}

export const CollapsibleCourseCard = memo(function CollapsibleCourseCard({
  course,
  defaultOpen = false,
}: CollapsibleCourseCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const getLevelStyle = (level: CourseData['level']) => {
    const styles = {
      undergraduate:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      graduate:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    } as const;
    return styles[level as keyof typeof styles] || styles.undergraduate;
  };

  const getStatusStyle = (status: CourseStatus) => {
    const styles = {
      completed:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      ongoing:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    } as const;
    return styles[status as keyof typeof styles] || styles.completed;
  };

  const enrollmentDisplay =
    typeof course.enrollmentCount === 'number'
      ? `${course.enrollmentCount} students`
      : 'Enrollment TBD';
  const institutionLabel =
    institutionNames[course.institution] ?? course.institution;

  return (
    <Card className="transition-all duration-200 hover:shadow-lg break-inside-avoid inline-block w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
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

            <div className="flex flex-wrap items-center gap-2">
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

            {/* Summary description */}
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
              {course.description}
            </p>

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
        </div>
      </CardHeader>

      {open && (
        <CardContent id={`course-${course.id}-details`} className="pt-0">
          <div className="space-y-4">
            {course.objectives && course.objectives.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Learning Objectives
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
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
                  {course.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
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
                    .map((feedback, index) => (
                      <p
                        key={index}
                        className="text-xs text-muted-foreground italic"
                      >
                        &ldquo;{feedback}&rdquo;
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
});
