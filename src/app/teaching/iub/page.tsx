import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/shared/lib/data/courses';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { SimpleCourseCard } from '@/features/teaching/simple-course-card';
import { iubCourseNavItems } from '@/shared/config/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
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
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesTaughtIUB.length}</div>
            <p className="text-xs text-muted-foreground">
              Across multiple semesters
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {coursesTaughtIUB.reduce(
                (total, course) => total + (course.enrollmentCount ?? 0),
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Students taught overall
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                coursesTaughtIUB
                  .filter((course) => course.rating)
                  .reduce((sum, course) => sum + (course.rating || 0), 0) /
                coursesTaughtIUB.filter((course) => course.rating).length
              ).toFixed(1)}
              /5.0
            </div>
            <p className="text-xs text-muted-foreground">Student feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Navigation */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">
          Course Navigation
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {iubCourseNavItems.map((course) => {
            const courseData = coursesTaughtIUB.find((c) =>
              course.href.includes(c.code.toLowerCase().replace(' ', ''))
            );
            return (
              <Link key={course.href} href={course.href}>
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
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">
          Course Overview
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coursesTaughtIUB.map((course) => (
            <SimpleCourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
