import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Target, Users, Award } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import TeachingTabsClient from './teaching-tabs.client';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';
import { getTeachingStats } from '@/shared/lib/data/teaching-stats';
import { TeachingHeroStats } from '@/features/teaching/teaching-hero-stats';
import { TeachingCTA } from '@/features/teaching/teaching-cta';

export const metadata: Metadata = {
  title: 'Teaching',
  description: `${siteConfig.author}'s teaching portfolio, course details, teaching philosophy, and student mentorship at IUB and BRACU.`,
};

export default function TeachingPage() {
  // Get teaching stats from centralized data source
  const stats = getTeachingStats();

  return (
    <div className="container-responsive space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
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
        <section
          aria-labelledby="teaching-philosophy"
          className="relative py-8"
        >
          <div className="max-w-5xl mx-auto">
            {/* Heading */}
            <h2
              id="teaching-philosophy"
              className="text-fluid-lg font-bold text-center mb-8 text-primary"
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
            {/* Three Pillars - Modernized */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Pillar 1: Hands-On Learning */}
              <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/50 p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users className="h-24 w-24 text-primary" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    Hands-On Learning
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    Bridging theory and industry practice through real-world
                    projects, interactive coding sessions, and practical
                    applications.
                  </p>
                </div>
              </div>

              {/* Pillar 2: OBE Methodology */}
              <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/50 p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Target className="h-24 w-24 text-primary" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    Outcome-Based
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    Structuring courses with clear learning objectives,
                    measurable outcomes, and continuous assessment aligned with
                    international OBE standards.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Student Success */}
              <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/50 p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="h-24 w-24 text-primary" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    Student Success
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    Fostering potential through personalized mentorship, career
                    guidance, and building confidence to tackle complex
                    technical challenges.
                  </p>
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
            className="text-fluid-lg font-bold text-center mb-8 text-primary"
          >
            Courses & Activities
          </h2>
          <Suspense
            fallback={
              <div className="text-center text-muted-foreground">
                Loading...
              </div>
            }
          >
            <TeachingTabsClient
              coursesTaughtIUB={coursesTaughtIUB}
              coursesTaughtBRACU={coursesTaughtBRACU}
            />
          </Suspense>
        </section>

        {/* Call to Action */}
        <section aria-labelledby="collaborate" className="py-8">
          <h2 id="collaborate" className="sr-only">
            Collaboration Opportunities
          </h2>
          <TeachingCTA />
        </section>
      </div>
    </div>
  );
}
