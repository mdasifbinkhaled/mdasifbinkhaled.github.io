'use client';

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
import { useState } from 'react';
import type { CourseData, CourseStatus } from '@/shared/types';
import { iconMap, institutionNames } from '@/shared/lib/data/courses';

interface SimpleCourseCardProps {
  course: CourseData;
  showFullDetails?: boolean;
}

export function SimpleCourseCard({
  course,
  showFullDetails = false,
}: SimpleCourseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getLevelStyle = (level: CourseData['level']) => {
    const styles = {
      undergraduate:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      graduate:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return styles[level as keyof typeof styles] || styles.undergraduate;
  };

  const getStatusStyle = (status: CourseStatus) => {
    const styles = {
      completed:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      ongoing:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };
    return styles[status as keyof typeof styles] || styles.completed;
  };

  const IconComponent =
    (course.iconName ? iconMap[course.iconName] : undefined) || BookOpen;
  const enrollmentDisplay =
    typeof course.enrollmentCount === 'number'
      ? `${course.enrollmentCount} students`
      : 'Enrollment TBD';
  const institutionLabel =
    institutionNames[course.institution] ?? course.institution;
  const status = course.status;

  return (
    <Card className="transition-all duration-200 hover:shadow-lg group course-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Course Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg leading-tight course-title">
                  {course.title}
                </CardTitle>
                <p className="text-sm font-mono text-primary course-code">
                  {course.code}
                </p>
              </div>
            </div>

            {/* Course Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={getLevelStyle(course.level)}>
                {course.level.toUpperCase()}
              </Badge>
              {status && (
                <Badge className={getStatusStyle(status)}>
                  {status.toUpperCase()}
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
            <p className="text-sm text-muted-foreground course-description mb-3">
              {course.description}
            </p>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {enrollmentDisplay}
              </div>
              {course.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {course.rating}/5.0
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {institutionLabel}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {showFullDetails && (
        <CardContent className="pt-0">
          {/* Expandable Details */}
          <div className="space-y-4">
            {/* Learning Objectives */}
            {course.objectives && course.objectives.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Learning Objectives
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {course.objectives
                    .slice(0, expanded ? undefined : 2)
                    .map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {objective}
                      </li>
                    ))}
                </ul>
                {course.objectives.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpanded(!expanded)}
                    className="h-auto p-0 mt-2 text-xs text-primary hover:text-primary/80"
                  >
                    {expanded ? (
                      <>
                        Show Less <ChevronUp className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Technologies */}
            {course.technologies && course.technologies.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {course.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs academic-badge"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Breakdown */}
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

            {/* Student Feedback */}
            {course.feedback && course.feedback.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Student Feedback
                </h4>
                <div className="space-y-1">
                  {course.feedback.slice(0, 2).map((feedback, index) => (
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
}
