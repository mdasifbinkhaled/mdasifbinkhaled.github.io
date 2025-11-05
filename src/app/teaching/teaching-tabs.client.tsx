'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { GraduationCap, Building2, Users } from 'lucide-react';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';
import { Badge } from '@/shared/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { CollapsibleCourseCard } from '@/features/teaching/collapsible-course-card';
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
  const tab = useMemo(() => {
    const t = sp.get('tab') ?? 'iub';
    return ['iub', 'bracu', 'support'].includes(t) ? t : 'iub';
  }, [sp]);

  return (
    <Tabs key={tab} defaultValue={tab} className="w-full">
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
            value="support"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary flex items-center gap-2 transition-all"
            title="Teaching Assistant, Student Tutor, School of Development"
          >
            <Users className="h-4 w-4" />
            <span>TA/ST/SoD</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              3
            </Badge>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="iub">
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          As a Senior Lecturer, I have taught a diverse range of undergraduate
          courses covering programming fundamentals, algorithms, system design,
          and mathematical foundations.
        </p>
        <ErrorBoundary
          fallback={
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Unable to load course information at this time.
              </p>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
            {coursesTaughtIUB.map((course) => (
              <div
                key={course.id}
                id={course.code.toLowerCase().replace(' ', '')}
              >
                <CollapsibleCourseCard course={course} />
              </div>
            ))}
          </div>
        </ErrorBoundary>
      </TabsContent>

      <TabsContent value="bracu">
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          Laboratory courses where I provided hands-on guidance and practical
          experience in computer graphics, numerical methods, compiler design,
          and mobile development.
        </p>
        <ErrorBoundary
          fallback={
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Unable to load BRACU course information at this time.
              </p>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
            {coursesTaughtBRACU.map((course) => (
              <div
                key={course.id}
                id={course.code.toLowerCase().replace(' ', '')}
              >
                <CollapsibleCourseCard course={course} />
              </div>
            ))}
          </div>
        </ErrorBoundary>
      </TabsContent>

      <TabsContent value="support">
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          Teaching support roles and student mentorship activities, including
          Teaching Assistant (TA), Student Tutor (ST), and School of Development
          (SoD) initiatives.
        </p>
        <div className="grid gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-2">
          <Card className="transition-all duration-200 hover:shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg">Teaching Assistant (TA)</CardTitle>
              <CardDescription>
                Undergraduate and Graduate TA roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  Supported course delivery, grading, and student consultations
                </li>
                <li>Facilitated lab sessions and tutorials</li>
                <li>Assisted in OBE-aligned assessment preparation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg">Student Tutor (ST)</CardTitle>
              <CardDescription>Peer tutoring and mentoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>One-on-one tutoring for core CS courses</li>
                <li>Exam prep sessions and problem-solving clinics</li>
                <li>Guidance on study strategies and project planning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg">
                School of Development (SoD)
              </CardTitle>
              <CardDescription>
                Workshops and skill-building initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Organized foundational programming bootcamps</li>
                <li>Soft skills and academic writing support</li>
                <li>Collaborative learning groups and mentoring</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
