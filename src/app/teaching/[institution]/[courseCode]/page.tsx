import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allCourses, institutionNames } from '@/shared/lib/data/courses';
import { CourseCard } from '@/features/teaching/course-card';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

interface CoursePageProps {
  params: Promise<{
    institution: string;
    courseCode: string;
  }>;
}

/**
 * Generate static paths for all courses at build time
 * This replaces the need for 14 individual page files
 */
export async function generateStaticParams() {
  return allCourses.map((course) => ({
    institution: course.institution.toLowerCase(),
    courseCode: course.code.toLowerCase().replace(/\s+/g, ''),
  }));
}

/**
 * Generate dynamic metadata for each course page
 */
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { institution, courseCode } = await params;

  // Find the course by matching institution and code
  const course = allCourses.find(
    (c) =>
      c.institution.toLowerCase() === institution.toLowerCase() &&
      c.code.toLowerCase().replace(/\s+/g, '') ===
        courseCode.toLowerCase().replace(/\s+/g, '')
  );

  if (!course) {
    return {
      title: 'Course Not Found | Teaching Portfolio',
    };
  }

  const institutionName = institutionNames[course.institution];

  return {
    title: `${course.code}: ${course.title} | Teaching Portfolio`,
    description: `Course details for ${course.code}: ${course.title} at ${institutionName}`,
  };
}

/**
 * Dynamic course detail page
 * Replaces 14 duplicate page.tsx files with a single dynamic route
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { institution, courseCode } = await params;

  // Find the course by matching institution and code
  const course = allCourses.find(
    (c) =>
      c.institution.toLowerCase() === institution.toLowerCase() &&
      c.code.toLowerCase().replace(/\s+/g, '') ===
        courseCode.toLowerCase().replace(/\s+/g, '')
  );

  // Show 404 if course not found
  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mt-6">
        <CourseCard course={course} variant="static" showDetails={true} />
      </div>
    </div>
  );
}
