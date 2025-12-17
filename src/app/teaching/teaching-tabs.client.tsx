'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  GraduationCap,
  Building2,
  Users,
  Presentation,
  Mic2,
  BookOpen,
} from 'lucide-react';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';
import { Badge } from '@/shared/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { CourseCard } from '@/features/teaching/course-card';
import type { CourseData } from '@/shared/types';
import { HashScroll } from '@/shared/components/common/hash-scroll';

interface TeachingTabsClientProps {
  coursesTaughtIUB: CourseData[];
  coursesTaughtBRACU: CourseData[];
}

export default function TeachingTabsClient({
  coursesTaughtIUB,
  coursesTaughtBRACU,
}: TeachingTabsClientProps) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tab = useMemo(() => {
    const t = sp.get('tab');
    if (!t) return 'iub';
    return ['iub', 'bracu', 'activities'].includes(t) ? t : 'iub';
  }, [sp]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(sp);
    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
      <HashScroll />
      <div className="flex justify-center">
        <TabsList className="bg-transparent p-0 border-b border-border rounded-none gap-2">
          <TabsTrigger
            value="iub"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary flex items-center gap-2 transition-all"
            title={`Independent University, Bangladesh - ${coursesTaughtIUB.length} courses`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>IUB</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {coursesTaughtIUB.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="bracu"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary flex items-center gap-2 transition-all"
            title={`BRAC University - ${coursesTaughtBRACU.length} lab courses`}
          >
            <Building2 className="h-4 w-4" />
            <span>BRACU</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {coursesTaughtBRACU.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="activities"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary flex items-center gap-2 transition-all"
            title="Teaching Assistantships, Workshops & Other Activities"
          >
            <Presentation className="h-4 w-4" />
            <span>Activities</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              7
            </Badge>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="iub">
        <ErrorBoundary
          fallback={
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Unable to load course information at this time.
              </p>
            </div>
          }
        >
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {coursesTaughtIUB.map((course) => (
              <div
                key={course.id}
                id={course.code.toLowerCase().replace(' ', '')}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </ErrorBoundary>
      </TabsContent>

      <TabsContent value="bracu">
        <ErrorBoundary
          fallback={
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Unable to load BRACU course information at this time.
              </p>
            </div>
          }
        >
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {coursesTaughtBRACU.map((course) => (
              <div
                key={course.id}
                id={course.code.toLowerCase().replace(' ', '')}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </ErrorBoundary>
      </TabsContent>

      <TabsContent value="activities">
        <div className="space-y-8">
          {/* Teaching Support Roles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Teaching Support Roles
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="transition-all duration-200 hover:shadow-lg h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Teaching Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Supported course delivery, grading, lab sessions, and
                    OBE-aligned assessments.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Student Tutor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Peer tutoring, exam prep sessions, and project guidance for
                    CS courses.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    School of Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Programming bootcamps, soft skills, and collaborative
                    learning groups.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Workshops & Seminars */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Workshops & Seminars
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mic2 className="h-4 w-4 text-primary" />
                    Python Automation Workshops
                  </CardTitle>
                  <CardDescription>IUB • 2023-2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Instructor for hands-on workshops teaching Python automation
                    to students and faculty.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mic2 className="h-4 w-4 text-primary" />
                    Micro-controller Programming
                  </CardTitle>
                  <CardDescription>CCSE, IUB</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Facilitated advanced micro-controller programming concepts
                    and applications.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    BAC Accreditation SAR
                  </CardTitle>
                  <CardDescription>IQAC, IUB • Oct 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Workshop on Self-Assessment Report preparation and course
                    file management.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mic2 className="h-4 w-4 text-primary" />
                    Yes We Can! Workshop
                  </CardTitle>
                  <CardDescription>CCSE, IUB</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Skill enhancement and motivation workshop for students.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
