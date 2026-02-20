import type { Metadata } from 'next';
import { coursesTaughtBRACU } from '@/shared/lib/data/courses';
import { siteConfig } from '@/shared/config/site';
import { InstitutionCoursesPage } from '@/features/teaching/components/institution-courses-page';

export const metadata: Metadata = {
  title: 'BRACU Courses - Teaching Portfolio',
  description: `Courses taught at BRAC University (BRACU) by ${siteConfig.author}. ${siteConfig.description}`,
  alternates: {
    canonical: `${siteConfig.url}/teaching/bracu`,
  },
};

export default function BRACUTeachingPage() {
  return (
    <InstitutionCoursesPage
      title="BRACU Courses"
      subtitle="Courses taught at BRAC University as Teaching Assistant & Instructor"
      courses={coursesTaughtBRACU}
    />
  );
}
