import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Target, Users, Award } from 'lucide-react';
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
    <div className="space-y-16">
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

      {/* Teaching Philosophy */}
      <section aria-labelledby="teaching-philosophy" className="relative py-8">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h2
            id="teaching-philosophy"
            className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary"
          >
            Teaching Philosophy & Approach
          </h2>

          {/* Main Description */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed text-left">
              As a{' '}
              <strong className="text-foreground">
                {siteConfig.role} at {siteConfig.institution}
              </strong>
              , I specialize in teaching computer science fundamentals,
              algorithms, system design, and mathematical foundations. My
              approach combines theoretical depth with practical application.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Pillar 1: Hands-On Learning */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Hands-On Learning
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Real-world projects, coding exercises, and practical
                    applications that bridge theory and industry practice.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2: OBE Methodology */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Outcome-Based Education
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Clear learning objectives, measurable outcomes, and
                    continuous assessment aligned with OBE standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Student Success */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Student-Centered Success
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Preparing students for real-world challenges through
                    mentorship, problem-solving, and industry-relevant skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses & Activities Section - Main Content */}
      <section
        id="courses-taught"
        aria-labelledby="courses-heading"
        className="py-8"
      >
        <h2
          id="courses-heading"
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary"
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
      <StudentTestimonials />

      {/* Call to Action */}
      <section aria-labelledby="collaborate" className="py-8">
        <h2 id="collaborate" className="sr-only">
          Collaboration Opportunities
        </h2>
        <TeachingCTA />
      </section>
    </div>
  );
}
