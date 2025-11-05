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

      {/* Teaching Overview */}
      <section
        aria-labelledby="teaching-overview"
        className="max-w-4xl mx-auto text-center"
      >
        <h2 id="teaching-overview" className="sr-only">
          Teaching Overview
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          As a{' '}
          <strong>Senior Lecturer at Independent University, Bangladesh</strong>
          , I specialize in teaching computer science fundamentals, algorithms,
          system design, and mathematical foundations. My teaching philosophy
          emphasizes <strong>hands-on learning</strong>,{' '}
          <strong>Outcome-Based Education (OBE)</strong>, and preparing students
          for real-world challenges.
        </p>
      </section>

      {/* Courses & Activities Section - Main Content */}
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
