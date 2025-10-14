import type { Metadata } from 'next';
import { coursesTaughtBRACU } from '@/shared/lib/data/courses';
import { SimpleCourseCard } from '@/features/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'CSE 110: Programming Language I | Teaching Portfolio',
  description:
    'Course details for CSE 110: Programming Language I at BRAC University',
};

export default function CSE110Page() {
  const course = coursesTaughtBRACU.find((c) => c.code === 'CSE 110');

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
