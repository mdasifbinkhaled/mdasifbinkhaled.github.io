import { Metadata } from 'next';
import { coursesTaughtBRACU } from '@/lib/data/courses';
import { SimpleCourseCard } from '@/components/teaching/simple-course-card';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'CSE 423: Computer Graphics Lab | Teaching Portfolio',
  description: 'Course details for CSE 423: Computer Graphics Lab at BRAC University',
};

export default function CSE423Page() {
  const course = coursesTaughtBRACU.find(c => c.code === 'CSE 423');

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
