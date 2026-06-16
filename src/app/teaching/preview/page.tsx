import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { TeachingHeroStats, MentorshipSection } from '@/features/teaching';
import { CourseCard } from '@/features/teaching/components/course-card';
import { TeachingRecordTable } from '@/features/teaching/components/teaching-record-table';
import { allCourses } from '@/shared/lib/data/courses';
import { getTeachingStats } from '@/shared/lib/data/teaching-stats';

/**
 * TEMPORARY preview of the restructured Teaching page (Courses + Teaching
 * record). Non-destructive — the live /teaching, institution pages, and
 * CSE 420 are untouched. Removed when the restructure is finalized.
 * Spec: docs/superpowers/specs/2026-06-16-teaching-page-restructure.md
 */
export const metadata: Metadata = {
  title: 'Teaching — restructure preview',
  robots: { index: false, follow: false },
};

export default function TeachingRestructurePreviewPage() {
  const stats = getTeachingStats();
  // Featured = active courses that have a page (today: CSE 211).
  const featured = allCourses.filter(
    (c) => c.tier === 'detailed' && c.status === 'ongoing'
  );

  return (
    <div className="container-responsive">
      <div className="mx-auto max-w-6xl space-y-16 py-2">
        <Breadcrumbs />
        <h1 className="sr-only">Teaching</h1>

        <section aria-label="Teaching statistics">
          <TeachingHeroStats
            totalStudents={stats.totalStudents}
            totalCourses={stats.totalCourses}
            averageRating={stats.averageRating}
            yearsTeaching={stats.yearsTeaching}
          />
        </section>

        <section className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {siteConfig.role} at {siteConfig.institution}. I teach
            computer-science fundamentals — algorithms, programming, system
            design, and mathematical foundations — pairing theoretical depth
            with practical application.
          </p>
        </section>

        {featured.length > 0 ? (
          <section aria-labelledby="featured-courses">
            <h2
              id="featured-courses"
              className="mb-6 text-2xl font-semibold tracking-tight"
            >
              Courses
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant="static"
                  showDetails
                />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="teaching-record">
          <h2
            id="teaching-record"
            className="mb-2 text-2xl font-semibold tracking-tight"
          >
            Teaching record
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Every course I&apos;ve taught, across institutions.
          </p>
          <TeachingRecordTable courses={allCourses} />
        </section>

        <MentorshipSection />
      </div>
    </div>
  );
}
