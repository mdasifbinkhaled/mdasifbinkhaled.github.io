import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/shared/lib/data/courses';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { CourseCard } from '@/features/teaching/course-card';
import { iubCourseNavItems } from '@/shared/config/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { StatCard } from '@/shared/components/common/stat-card';
import { ArrowRight, Building2, Calendar, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IUB Courses - Teaching Portfolio',
  description: `Courses taught at Independent University, Bangladesh (IUB) by ${siteConfig.author}. ${siteConfig.description}`,
};

export default function IUBTeachingPage() {
  return (
    <div className="space-y-12">
      <Breadcrumbs />

      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            IUB Courses
          </h1>
        </div>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Courses taught at Independent University, Bangladesh as Senior
          Lecturer & Lecturer
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          icon={Calendar}
          label="Total Courses"
          number={coursesTaughtIUB.length}
          description="Across multiple semesters"
        />
        <StatCard
          icon={Users}
          label="Total Students"
          number={coursesTaughtIUB.reduce(
            (total, course) => total + (course.enrollmentCount ?? 0),
            0
          )}
          description="Students taught overall"
        />
        <StatCard
          icon={Building2}
          label="Avg. Rating"
          number={
            coursesTaughtIUB
              .filter((course) => course.rating)
              .reduce((sum, course) => sum + (course.rating || 0), 0) /
            coursesTaughtIUB.filter((course) => course.rating).length
          }
          suffix="/5.0"
          decimals={1}
          description="Student feedback"
        />
      </div>

      {/* Course Navigation */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          Course Navigation
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {iubCourseNavItems.map((course) => {
            const courseData = coursesTaughtIUB.find((c) =>
              course.href.includes(c.code.toLowerCase().replace(' ', ''))
            );
            const anchor = course.href.split('/').pop();
            return (
              <Link key={course.href} href={`/teaching/iub#${anchor}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors flex items-center justify-between">
                      {course.label}
                      <ArrowRight className="w-4 h-4" />
                    </CardTitle>
                    {courseData && (
                      <div className="text-xs text-muted-foreground">
                        {courseData.semester} {courseData.year} •{' '}
                        {courseData.enrollmentCount ?? 'Enrollment TBD'}{' '}
                        students
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Course Overview */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          Course Overview
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coursesTaughtIUB.map((course) => (
            <div
              key={course.id}
              id={course.code.toLowerCase().replace(' ', '')}
            >
              <CourseCard course={course} variant="static" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
