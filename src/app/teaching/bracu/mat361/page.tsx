import { Metadata } from 'next';
import { coursesTaughtBRACU } from '@/shared/lib/data/courses';
import { SimpleCourseCard } from '@/features/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'MAT 361: Numerical Methods Lab | Teaching Portfolio',
  description:
    'Course details for MAT 361: Numerical Methods Lab at BRAC University',
};

export default function MAT361Page() {
  const course = coursesTaughtBRACU.find((c) => c.code === 'MAT 361');

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="mt-6">
        <SimpleCourseCard course={course} showFullDetails={true} />
      </div>
    </div>
  );
}
