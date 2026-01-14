'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Star,
  Users,
  Code2,
} from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import { Icon } from '@/shared/components/common/icons';
import { getLevelStyle } from './styles';

// -----------------------------------------------------------------------------
// Simplified Course Page Layout - Clean, minimal, focused
// -----------------------------------------------------------------------------

interface CoursePageLayoutProps {
  course: CourseData;
}

export function CoursePageLayout({ course }: CoursePageLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/teaching">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Teaching
        </Link>
      </Button>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="bg-primary/10 p-3 rounded-xl shrink-0">
            {course.iconName ? (
              <Icon name={course.iconName} className="w-8 h-8 text-primary" />
            ) : (
              <BookOpen className="w-8 h-8 text-primary" />
            )}
          </div>

          {/* Title & Meta */}
          <div>
            <p className="font-mono text-primary text-sm font-medium">
              {course.code}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
          </div>
        </div>

        <p className="text-muted-foreground max-w-3xl">{course.description}</p>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className={getLevelStyle(course.level)}>{course.level}</Badge>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            {course.semester} {course.year}
          </Badge>
          <Badge variant="secondary">
            <GraduationCap className="w-3 h-3 mr-1" />
            {course.credits} Credits
          </Badge>
          {course.enrollmentCount && (
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              {course.enrollmentCount} students
            </Badge>
          )}
          {course.rating && (
            <Badge variant="outline">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {course.rating}/5.0
            </Badge>
          )}
        </div>
      </header>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Learning Objectives */}
        {course.objectives && course.objectives.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{obj}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Expected Outcomes */}
        {course.outcomes && course.outcomes.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Expected Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Topics */}
        {course.topics && course.topics.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Course Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-1.5 text-sm">
                {course.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-baseline gap-2">
                    <span className="text-primary font-medium w-5">
                      {idx + 1}.
                    </span>
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Technologies */}
        {course.technologies && course.technologies.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assessment */}
        {course.assessment && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(course.assessment).map(([key, value]) => {
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .split(' ')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <Progress value={value} className="h-1.5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Student Feedback */}
        {course.feedback && course.feedback.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Student Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {course.feedback.map((fb, idx) => (
                  <blockquote
                    key={idx}
                    className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3"
                  >
                    &ldquo;{fb}&rdquo;
                  </blockquote>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
