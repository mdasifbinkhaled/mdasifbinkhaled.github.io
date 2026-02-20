import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { CourseCardCompact } from '@/features/teaching/course-card-compact';
import { StatCard } from '@/shared/components/common/stat-card';
import { Building2, Calendar, Users } from 'lucide-react';
import type { CourseData } from '@/shared/types';

interface InstitutionCoursesPageProps {
  title: string;
  subtitle: string;
  courses: CourseData[];
}

export function InstitutionCoursesPage({
  title,
  subtitle,
  courses,
}: InstitutionCoursesPageProps) {
  const totalStudents = courses.reduce(
    (total, course) => total + (course.enrollmentCount ?? 0),
    0
  );

  const ratedCourses = courses.filter((course) => course.rating);
  const avgRating =
    ratedCourses.length > 0
      ? ratedCourses.reduce((sum, course) => sum + (course.rating || 0), 0) /
      ratedCourses.length
      : 0;

  return (
    <div className="space-y-12">
      <Breadcrumbs />

      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {title}
          </h1>
        </div>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {subtitle}
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          icon={Calendar}
          label="Total Courses"
          number={courses.length}
          description="Across multiple semesters"
        />
        <StatCard
          icon={Users}
          label="Total Students"
          number={totalStudents}
          description="Students taught overall"
        />
        <StatCard
          icon={Building2}
          label="Avg. Rating"
          number={avgRating}
          suffix="/5.0"
          decimals={1}
          description="Student feedback"
        />
      </div>

      {/* Course Overview */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          Courses Taught
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              id={course.code.toLowerCase().replace(' ', '')}
            >
              <CourseCardCompact course={course} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
