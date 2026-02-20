import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/shared/lib/data/courses';
import { siteConfig } from '@/shared/config/site';
import { InstitutionCoursesPage } from '@/features/teaching/components/institution-courses-page';

export const metadata: Metadata = {
  title: 'IUB Courses - Teaching Portfolio',
  description: `Courses taught at Independent University, Bangladesh (IUB) by ${siteConfig.author}. ${siteConfig.description}`,
  alternates: {
    canonical: `${siteConfig.url}/teaching/iub`,
  },
};

export default function IUBTeachingPage() {
  return (
    <InstitutionCoursesPage
      title="IUB Courses"
      subtitle="Courses taught at Independent University, Bangladesh as Senior Lecturer & Lecturer"
      courses={coursesTaughtIUB}
    />
  );
}
