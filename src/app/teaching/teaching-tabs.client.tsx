'use client';

import { useState } from 'react';
import { GraduationCap, Building2 } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { CourseCard } from '@/features/teaching/course-card';
import type { CourseData } from '@/shared/types';

interface TeachingTabsClientProps {
  coursesTaughtIUB: CourseData[];
  coursesTaughtBRACU: CourseData[];
}

/**
 * Simple grid of course cards
 */
function CourseGrid({ courses }: { courses: CourseData[] }) {
  if (courses.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No courses to display.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default function TeachingTabsClient({
  coursesTaughtIUB,
  coursesTaughtBRACU,
}: TeachingTabsClientProps) {
  const [tab, setTab] = useState('iub');

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="bg-transparent p-0 border-b border-border rounded-none gap-4 w-full justify-start mb-6">
        <TabsTrigger
          value="iub"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-2 px-0"
        >
          <GraduationCap className="h-4 w-4 mr-1.5" />
          IUB
          <Badge variant="secondary" className="ml-2 text-xs">
            {coursesTaughtIUB.length}
          </Badge>
        </TabsTrigger>

        <TabsTrigger
          value="bracu"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-2 px-0"
        >
          <Building2 className="h-4 w-4 mr-1.5" />
          BRACU
          <Badge variant="secondary" className="ml-2 text-xs">
            {coursesTaughtBRACU.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="iub" className="mt-0">
        <CourseGrid courses={coursesTaughtIUB} />
      </TabsContent>

      <TabsContent value="bracu" className="mt-0">
        <CourseGrid courses={coursesTaughtBRACU} />
      </TabsContent>
    </Tabs>
  );
}
