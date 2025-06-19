import { Metadata } from 'next';
import { coursesTaughtBRACU } from '@/lib/data/courses';
import { SimpleCourseCard } from '@/components/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'CSE 420: Compiler Design Lab | Teaching Portfolio',
  description: 'Course details for CSE 420: Compiler Design Lab at BRAC University',
};

export default function CSE420Page() {
  const course = coursesTaughtBRACU.find(c => c.code === 'CSE 420');

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
