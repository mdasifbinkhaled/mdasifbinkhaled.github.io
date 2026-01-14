import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allCourses, institutionNames } from '@/shared/lib/data/courses';
import { CoursePageLayout } from '@/features/teaching/course-page-layout';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

interface CoursePageProps {
  params: Promise<{
    institution: string;
    courseCode: string;
  }>;
}

/**
 * Generate static paths for all courses at build time
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
    description: `Course details for ${course.code}: ${course.title} at ${institutionName}. ${course.description}`,
    keywords: [
      course.code,
      course.title,
      course.institution,
      ...(course.technologies || []),
    ],
  };
}

/**
 * Course Detail Page - World-Class Teaching Portal
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { institution, courseCode } = await params;

  // Find the current course
  const course = allCourses.find(
    (c) =>
      c.institution.toLowerCase() === institution.toLowerCase() &&
      c.code.toLowerCase().replace(/\s+/g, '') ===
        courseCode.toLowerCase().replace(/\s+/g, '')
  );

  if (!course) {
    notFound();
  }

  // Get courses from the same institution for navigation
  const sameInstitutionCourses = allCourses.filter(
    (c) => c.institution.toLowerCase() === institution.toLowerCase()
  );
  const currentIdx = sameInstitutionCourses.findIndex(
    (c) => c.id === course.id
  );

  const previousCourse =
    currentIdx > 0 ? sameInstitutionCourses[currentIdx - 1] : null;
  const nextCourse =
    currentIdx < sameInstitutionCourses.length - 1
      ? sameInstitutionCourses[currentIdx + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mt-6">
        <CoursePageLayout
          course={course}
          previousCourse={previousCourse}
          nextCourse={nextCourse}
        />
      </div>
    </div>
  );
}
