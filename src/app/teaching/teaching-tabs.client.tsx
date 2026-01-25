'use client';
import { INSTITUTIONS } from '@/shared/config/constants';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { GraduationCap, Building2, Presentation } from 'lucide-react';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';
import { Badge } from '@/shared/components/ui/badge';
import { CourseCard } from '@/features/teaching/course-card';
import type { CourseData } from '@/shared/types';
import { HashScroll } from '@/shared/components/common/hash-scroll';
import { Icon } from '@/shared/components/common/icons';
import {
  teachingSupportRoles,
  workshopsAndSeminars,
  getActivityCount,
  type TeachingActivity,
} from '@/shared/lib/data/activities';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { SPRING_TRANSITION, FadeIn } from '@/shared/components/ui/motion';

interface TeachingTabsClientProps {
  coursesTaughtIUB: CourseData[];
  coursesTaughtBRACU: CourseData[];
}

/**
 * Reusable component for rendering a list of courses
 */
function CourseList({ courses }: { courses: CourseData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course, index) => (
        <FadeIn
          key={course.id}
          delay={index * 0.05}
          id={course.code.toLowerCase().replace(' ', '')}
        >
          <CourseCard course={course} />
        </FadeIn>
      ))}
    </div>
  );
}

/**
 * Activity card component for support roles and workshops
 */
function ActivityCard({ activity }: { activity: TeachingActivity }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={SPRING_TRANSITION}
      className="h-full"
    >
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
          <p className="text-sm text-muted-foreground">
            {activity.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function TeachingTabsClient({
  coursesTaughtIUB,
  coursesTaughtBRACU,
}: TeachingTabsClientProps) {
  // Simple local state
  const [activeTab, setActiveTab] = useState('iub');

  const tabs = [
    {
      id: 'iub',
      label: INSTITUTIONS.IUB.CODE,
      title: `${INSTITUTIONS.IUB.NAME} - ${coursesTaughtIUB.length} courses`,
      icon: GraduationCap,
      count: coursesTaughtIUB.length,
    },
    {
      id: 'bracu',
      label: INSTITUTIONS.BRACU.CODE,
      title: `${INSTITUTIONS.BRACU.NAME} - ${coursesTaughtBRACU.length} lab courses`,
      icon: Building2,
      count: coursesTaughtBRACU.length,
    },
    {
      id: 'activities',
      label: 'Activities',
      title: 'Teaching Assistantships, Workshops & Other Activities',
      icon: Presentation,
      count: getActivityCount(),
    },
  ];

  return (
    <div className="w-full space-y-8">
      <HashScroll />

      {/* Animated Tab Switcher */}
      <div className="flex justify-center">
        <div className="flex space-x-1 rounded-full bg-muted/30 p-1 backdrop-blur-sm border border-border/50">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                title={tab.title}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full bg-background shadow-sm ring-1 ring-border"
                    transition={SPRING_TRANSITION}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  <Badge
                    variant={isActive ? 'secondary' : 'outline'}
                    className="ml-1 text-[10px] h-5 px-1.5"
                  >
                    {tab.count}
                  </Badge>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area with Morphing Size */}
      <ErrorBoundary
        fallback={
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Unable to load content at this time.
            </p>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeTab === 'iub' && <CourseList courses={coursesTaughtIUB} />}
            {activeTab === 'bracu' && (
              <CourseList courses={coursesTaughtBRACU} />
            )}
            {activeTab === 'activities' && (
              <div className="space-y-8">
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
            )}
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    </div>
  );
}
