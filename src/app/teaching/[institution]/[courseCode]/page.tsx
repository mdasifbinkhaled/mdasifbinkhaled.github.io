import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allCourses, institutionNames } from '@/shared/lib/data/courses';
import { CoursePageLayout } from '@/features/teaching/course-page-layout';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { CourseStructuredDataScript } from '@/shared/components/common/structured-data';

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
  // ONLY generate pages for 'detailed' tier courses
  // This matches the logic in CourseCard which only links if tier === 'detailed'
  return allCourses
    .filter((course) => course.tier === 'detailed')
    .map((course) => ({
      institution: course.institution.toLowerCase(),
      courseCode: course.slug
        ? course.slug.toLowerCase()
        : course.code.toLowerCase().replace(/\s+/g, ''),
    }));
}

/**
 * Generate dynamic metadata for each course page
 */
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { institution, courseCode } = await params;

  const course = allCourses.find((c) => {
    const slug = c.slug
      ? c.slug.toLowerCase()
      : c.code.toLowerCase().replace(/\s+/g, '');
    return (
      c.institution.toLowerCase() === institution.toLowerCase() &&
      slug === courseCode.toLowerCase()
    );
  });

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
 * Course Detail Page
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { institution, courseCode } = await params;

  const course = allCourses.find((c) => {
    const slug = c.slug
      ? c.slug.toLowerCase()
      : c.code.toLowerCase().replace(/\s+/g, '');
    return (
      c.institution.toLowerCase() === institution.toLowerCase() &&
      slug === courseCode.toLowerCase()
    );
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Structured Data for rich results */}
      <CourseStructuredDataScript course={course} />

      <Breadcrumbs />
      <div className="mt-6">
        <CoursePageLayout course={course} />
      </div>
    </div>
  );
}
