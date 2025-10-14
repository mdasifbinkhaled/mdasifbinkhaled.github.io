import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/shared/lib/data/courses';
import { SimpleCourseCard } from '@/features/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'CSE 423: Machine Learning | Teaching Portfolio',
  description:
    'Course details for CSE 423: Machine Learning at Independent University, Bangladesh (IUB)',
};

export default function CSE423Page() {
  const course = coursesTaughtIUB.find((c) => c.code === 'CSE 423');

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
