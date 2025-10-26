import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/shared/config';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import TeachingTabsClient from './teaching-tabs.client';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';

export const metadata: Metadata = {
  title: 'Teaching Portfolio',
  description: `${siteConfig.author}'s teaching philosophy, experience with Outcome-Based Education (OBE), and list of courses taught. ${siteConfig.description}`,
  alternates: {
    canonical: '/teaching',
  },
};

export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <Breadcrumbs />

      {/* Tabbed sections */}
      <section id="courses-taught" className="mt-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Courses & Activities
        </h2>
        <Suspense
          fallback={
            <div className="text-center text-muted-foreground">Loading...</div>
          }
        >
          <TeachingTabsClient
            coursesTaughtIUB={coursesTaughtIUB}
            coursesTaughtBRACU={coursesTaughtBRACU}
          />
        </Suspense>
      </section>
    </div>
  );
}
