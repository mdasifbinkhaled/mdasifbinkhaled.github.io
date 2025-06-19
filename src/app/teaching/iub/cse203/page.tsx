import { Metadata } from 'next';
import { coursesTaughtIUB } from '@/lib/data/courses';
import { SimpleCourseCard } from '@/components/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'CSE 203: Data Structures | Teaching Portfolio',
  description: 'Course details for CSE 203: Data Structures at Independent University, Bangladesh (IUB)',
};

export default function CSE203Page() {
  const course = coursesTaughtIUB.find(c => c.code === 'CSE 203');

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
