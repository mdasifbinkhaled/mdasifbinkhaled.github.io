'use client';

import {
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Star,
  Target,
  Users,
  Layers,
  Award,
  Code2,
} from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { Icon } from '@/shared/components/common/icons';
import { cn } from '@/shared/lib/utils';
import { getLevelStyle } from './styles';

// =============================================================================
// COURSE PAGE LAYOUT - World-Class Teaching Portal Design
// =============================================================================

interface CoursePageLayoutProps {
  course: CourseData;
}

// -----------------------------------------------------------------------------
// Hero Section - Gradient header with course info
// -----------------------------------------------------------------------------
function CourseHero({ course }: { course: CourseData }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-8 md:p-12">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Course Icon & Title */}
        <div className="flex items-start gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary to-primary/60 p-4 rounded-2xl shadow-lg shadow-primary/25">
            {course.iconName ? (
              <Icon name={course.iconName} className="w-10 h-10 text-white" />
            ) : (
              <BookOpen className="w-10 h-10 text-white" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-mono text-primary text-lg font-semibold mb-1">
              {course.code}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {course.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {course.description}
            </p>
          </div>
        </div>

        {/* Badges & Stats */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge
            className={cn('text-sm py-1 px-3', getLevelStyle(course.level))}
          >
            {course.level.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3 gap-1">
            <Calendar className="w-4 h-4" />
            {course.semester} {course.year}
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3 gap-1">
            <GraduationCap className="w-4 h-4" />
            {course.credits} Credits
          </Badge>
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 bg-background/50"
          >
            {course.institution}
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock
            icon={<Users className="w-5 h-5" />}
            label="Students"
            value={course.enrollmentCount?.toString() || 'TBD'}
          />
          <StatBlock
            icon={<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
            label="Rating"
            value={course.rating ? `${course.rating}/5.0` : 'N/A'}
          />
          <StatBlock
            icon={<Layers className="w-5 h-5" />}
            label="Topics"
            value={course.topics?.length?.toString() || '0'}
          />
          <StatBlock
            icon={<Code2 className="w-5 h-5" />}
            label="Technologies"
            value={course.technologies?.length?.toString() || '0'}
          />
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Overview Tab - Objectives & Outcomes
// -----------------------------------------------------------------------------
function OverviewSection({ course }: { course: CourseData }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Learning Objectives */}
      {course.objectives && course.objectives.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Objectives
            </h3>
            <ul className="space-y-3">
              {course.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Learning Outcomes */}
      {course.outcomes && course.outcomes.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Expected Outcomes
            </h3>
            <ul className="space-y-3">
              {course.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-green-500/10 rounded-full p-1 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-muted-foreground">{outcome}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Syllabus Tab - Topics & Assessment
// -----------------------------------------------------------------------------
function SyllabusSection({ course }: { course: CourseData }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Topics */}
      {course.topics && course.topics.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Course Topics
            </h3>
            <div className="grid gap-2">
              {course.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Breakdown */}
      {course.assessment && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Assessment Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(course.assessment).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize text-sm">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Resources Tab - Technologies & Tools
// -----------------------------------------------------------------------------
function ResourcesSection({ course }: { course: CourseData }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Technologies */}
      {course.technologies && course.technologies.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-sm py-1.5 px-3"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignments & Projects */}
      <div className="space-y-6">
        {course.assignments && course.assignments.length > 0 && (
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Assignments</h3>
              <ul className="space-y-2">
                {course.assignments.map((assignment, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {assignment}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {course.projects && course.projects.length > 0 && (
          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Projects</h3>
              <ul className="space-y-2">
                {course.projects.map((project, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {project}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Feedback Tab - Student Testimonials
// -----------------------------------------------------------------------------
function FeedbackSection({ course }: { course: CourseData }) {
  if (!course.feedback || course.feedback.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No feedback available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {course.feedback.map((fb, idx) => (
        <Card key={idx} className="border-primary/10 bg-muted/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < (course.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  )}
                />
              ))}
            </div>
            <p className="text-muted-foreground italic">&ldquo;{fb}&rdquo;</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Layout Component
// -----------------------------------------------------------------------------
export function CoursePageLayout({ course }: CoursePageLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <CourseHero course={course} />

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0 gap-2">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="syllabus"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Syllabus
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewSection course={course} />
        </TabsContent>

        <TabsContent value="syllabus" className="mt-6">
          <SyllabusSection course={course} />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <ResourcesSection course={course} />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <FeedbackSection course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
