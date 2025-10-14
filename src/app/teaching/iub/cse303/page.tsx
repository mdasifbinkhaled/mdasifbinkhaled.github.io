import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/shared/lib/data/courses';
import { SimpleCourseCard } from '@/features/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'CSE 303: Operating Systems | Teaching Portfolio',
  description:
    'Course details for CSE 303: Operating Systems at Independent University, Bangladesh (IUB)',
};

export default function CSE303Page() {
  const course = coursesTaughtIUB.find((c) => c.code === 'CSE 303');

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
