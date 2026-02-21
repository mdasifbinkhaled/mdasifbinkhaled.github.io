'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { GraduationCap, Building2, Presentation } from 'lucide-react';
import { ErrorBoundary } from '@/shared/components/common/error-boundary';
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
import { Icon } from '@/shared/components/common/icons';
import {
  teachingSupportRoles,
  workshopsAndSeminars,
  getActivityCount,
} from '@/shared/lib/data/activities';
import type { TeachingActivity } from '@/shared/types/teaching';

interface TeachingTabsClientProps {
  coursesTaughtIUB: CourseData[];
  coursesTaughtBRACU: CourseData[];
}

/**
 * Reusable component for rendering a list of courses
 */
function CourseList({ courses }: { courses: CourseData[] }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Unable to load course information at this time.
          </p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} id={course.code.toLowerCase().replace(' ', '')}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </ErrorBoundary>
  );
}

/**
 * Activity card component for support roles and workshops
 */
function ActivityCard({ activity }: { activity: TeachingActivity }) {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {activity.iconName && (
            <Icon name={activity.iconName} className="h-4 w-4 text-primary" />
          )}
          {activity.title}
        </CardTitle>
        {activity.period && (
          <CardDescription>
            {activity.institution} • {activity.period}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </CardContent>
    </Card>
  );
}

export default function TeachingTabsClient({
  coursesTaughtIUB,
  coursesTaughtBRACU,
}: TeachingTabsClientProps) {
  // Simple local state instead of URL sync (reduces complexity)
  const [tab, setTab] = useState('iub');

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
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
              {getActivityCount()}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="iub">
        <CourseList courses={coursesTaughtIUB} />
      </TabsContent>

      <TabsContent value="bracu">
        <CourseList courses={coursesTaughtBRACU} />
      </TabsContent>

      <TabsContent value="activities">
        <div className="space-y-8">
          {/* Teaching Support Roles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Teaching Support Roles
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {teachingSupportRoles.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Workshops & Seminars */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Workshops & Seminars
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {workshopsAndSeminars.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
