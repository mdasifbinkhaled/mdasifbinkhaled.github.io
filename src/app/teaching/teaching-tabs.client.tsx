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
import { Mic2, BookOpen } from 'lucide-react';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';
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
    return ['iub', 'bracu', 'support', 'workshops'].includes(t) ? t : 'iub';
  }, [sp]);

  return (
    <Tabs key={tab} defaultValue={tab} className="w-full">
      <HashScroll />
      <div className="flex justify-center">
        <TabsList className="bg-transparent p-0 border-b border-border rounded-none gap-2">
          <TabsTrigger
            value="iub"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            IUB
          </TabsTrigger>
          <TabsTrigger
            value="bracu"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            BRACU
          </TabsTrigger>
          <TabsTrigger
            value="support"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            TA/ST/SoD
          </TabsTrigger>
          <TabsTrigger
            value="workshops"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Workshops & Seminars
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
          <div className="columns-1 md:columns-2 lg:columns-2 gap-[var(--space-lg)] [column-fill:_balance]">
            {coursesTaughtIUB.map((course) => (
              <div
                key={course.id}
                id={course.code.toLowerCase().replace(' ', '')}
                className="break-inside-avoid mb-[var(--space-lg)] inline-block w-full"
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
          <div className="columns-1 md:columns-2 lg:columns-2 gap-[var(--space-lg)] [column-fill:_balance]">
            {coursesTaughtBRACU.map((course) => (
              <div
                key={course.id}
                id={course.code.toLowerCase().replace(' ', '')}
                className="break-inside-avoid mb-[var(--space-lg)] inline-block w-full"
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

      <TabsContent value="workshops">
        <div className="grid gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-2 items-stretch">
          {/* Workshop items */}
          <div className="flex">
            <Card className="transition-all duration-200 hover:shadow-lg h-full flex flex-col">
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <Mic2 className="h-8 w-8 text-primary mt-1" />
                <div className="flex-1">
                  <CardTitle className="text-base">
                    Instructor - Automate Your Day with Python Workshops
                  </CardTitle>
                  <CardDescription>
                    Independent University, Bangladesh • Autumn 2023 & Spring
                    2024
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-sm text-muted-foreground">
                  Conducted hands-on workshops to teach Python automation
                  techniques to students and faculty members, focusing on
                  practical applications that can improve productivity and
                  streamline routine tasks.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex">
            <Card className="transition-all duration-200 hover:shadow-lg h-full flex flex-col">
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <BookOpen className="h-8 w-8 text-primary mt-1" />
                <div className="flex-1">
                  <CardTitle className="text-base">
                    Participant - Preparation of Self-Assessment Report (SAR)
                    for BAC Accreditation Workshop
                  </CardTitle>
                  <CardDescription>
                    Institutional Quality Assurance Cell (IQAC), IUB • Oct 2024
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-sm text-muted-foreground">
                  Participated in a workshop on SAR preparation, course file
                  management, and accreditation requirements for PSAC members.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex">
            <Card className="transition-all duration-200 hover:shadow-lg h-full flex flex-col">
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <Mic2 className="h-8 w-8 text-primary mt-1" />
                <div className="flex-1">
                  <CardTitle className="text-base">
                    Facilitator - Advanced Micro-controller Programming Workshop
                  </CardTitle>
                  <CardDescription>
                    Center for Cognitive Skill Enhancement (CCSE), IUB
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-sm text-muted-foreground">
                  Facilitated a workshop focusing on advanced concepts and
                  practical applications of micro-controller programming.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex">
            <Card className="transition-all duration-200 hover:shadow-lg h-full flex flex-col">
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <Mic2 className="h-8 w-8 text-primary mt-1" />
                <div className="flex-1">
                  <CardTitle className="text-base">
                    Facilitator - Yes We Can! Workshop
                  </CardTitle>
                  <CardDescription>
                    Center for Cognitive Skill Enhancement (CCSE), IUB
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-sm text-muted-foreground">
                  Contributed to a workshop aimed at skill enhancement and
                  motivation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
