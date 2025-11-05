import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/shared/config';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import TeachingTabsClient from './teaching-tabs.client';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';
import { getTeachingStats } from '@/shared/lib/data/teaching-stats';
import { TeachingHeroStats } from '@/features/teaching/teaching-hero-stats';
import { TeachingTimeline } from '@/features/teaching/teaching-timeline';
import { StudentTestimonials } from '@/features/teaching/student-testimonials';
import { TeachingCTA } from '@/features/teaching/teaching-cta';

export const metadata: Metadata = {
  title: 'Teaching Portfolio',
  description: `${siteConfig.author}'s teaching philosophy, experience with Outcome-Based Education (OBE), and list of courses taught. ${siteConfig.description}`,
  alternates: {
    canonical: '/teaching',
  },
};

export default function TeachingPage() {
  // Get teaching stats from centralized data source
  const stats = getTeachingStats();

  return (
    <div className="space-y-[var(--space-section-lg)]">
      <Breadcrumbs />

      {/* Hero Stats Section */}
      <section aria-labelledby="teaching-stats">
        <h2 id="teaching-stats" className="sr-only">
          Teaching Statistics
        </h2>
        <TeachingHeroStats
          totalStudents={stats.totalStudents}
          totalCourses={stats.totalCourses}
          averageRating={stats.averageRating}
          yearsTeaching={stats.yearsTeaching}
        />
      </section>

      {/* Timeline Section - Compact */}
      <section aria-labelledby="teaching-journey">
        <h2
          id="teaching-journey"
          className="text-2xl font-bold text-center mb-6 text-primary"
        >
          Teaching Journey
        </h2>
        <TeachingTimeline />
      </section>

      {/* Courses & Activities Section */}
      <section id="courses-taught" aria-labelledby="courses-heading">
        <h2
          id="courses-heading"
          className="text-3xl font-bold text-center mb-[var(--space-lg)] text-primary"
        >
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

      {/* Testimonials Section */}
      <section aria-labelledby="student-feedback">
        <h2
          id="student-feedback"
          className="text-3xl font-bold text-center mb-[var(--space-lg)] text-primary"
        >
          Student Feedback
        </h2>
        <StudentTestimonials />
      </section>

      {/* Call to Action */}
      <section aria-labelledby="collaborate">
        <h2 id="collaborate" className="sr-only">
          Collaboration Opportunities
        </h2>
        <TeachingCTA />
      </section>
    </div>
  );
}
