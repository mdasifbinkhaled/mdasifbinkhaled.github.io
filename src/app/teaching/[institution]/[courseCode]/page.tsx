import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allCourses, institutionNames } from '@/shared/lib/data/courses';
import { CoursePage as CommandCenterCoursePage } from '@/features/teaching/components/course-page';
import { CourseStructuredDataScript } from '@/shared/components/infra/structured-data';

interface CoursePageProps {
  params: Promise<{
    institution: string;
    courseCode: string;
  }>;
}

/**
 * Helper to fetch a course from route params
 */
function getCourseByParams(institution: string, courseCode: string) {
  return allCourses.find((c) => {
    const slug = c.slug
      ? c.slug.toLowerCase()
      : c.code.toLowerCase().replace(/\s+/g, '');
    return (
      c.institution.toLowerCase() === institution.toLowerCase() &&
      slug === courseCode.toLowerCase()
    );
  });
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
  const course = getCourseByParams(institution, courseCode);

  if (!course) {
    return {
      title: 'Course Not Found | Teaching Portfolio',
    };
  }

  const institutionName = institutionNames[course.institution];

  const slug =
    course.slug?.toLowerCase() ?? course.code.toLowerCase().replace(/\s+/g, '');

  return {
    title: `${course.code}: ${course.title} | Teaching Portfolio`,
    description: `Course details for ${course.code}: ${course.title} at ${institutionName}. ${course.description}`,
    alternates: {
      canonical: `/teaching/${course.institution.toLowerCase()}/${slug}`,
    },
    keywords: [
      course.code,
      course.title,
      course.institution,
      ...(course.technologies || []),
    ],
    openGraph: {
      title: `${course.code}: ${course.title}`,
      description: `Course details for ${course.code}: ${course.title} at ${institutionName}. ${course.description}`,
      type: 'article',
    },
  };
}

/**
 * Course Detail Page
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { institution, courseCode } = await params;
  const course = getCourseByParams(institution, courseCode);

  // Only detailed courses generate a page, and every detailed course uses the
  // full-width "Command Center" template.
  if (!course || course.template !== 'command-center') {
    notFound();
  }

  return (
    <>
      <CourseStructuredDataScript course={course} />
      <CommandCenterCoursePage course={course} />
    </>
  );
}
