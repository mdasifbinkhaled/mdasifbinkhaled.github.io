import type { Metadata } from 'next';
import { ToolsHero } from '@/features/apps/components/tools-hero';
import { ToolCard } from '@/features/apps/components/tool-card';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Student Apps | ${siteConfig.author}`,
  description:
    'A suite of interactive academic utilities including grade calculators, seat planners, and study aids.',
  alternates: {
    canonical: `${siteConfig.url}/apps`,
  },
};

export default function AppsPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <ToolsHero />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Available Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Grade Calculator"
            description="Calculate your current class standing and dynamically project the required scores needed to achieve your target final grade."
            icon="Calculator"
            href="/apps/grade-calculator"
            status="active"
          />
          <ToolCard
            title="GPA Calculator"
            description="Compute your semester GPA and cumulative CGPA across multiple credit-weighted courses."
            icon="Brain"
            href="/apps/gpa-calculator"
            status="planned"
          />
          <ToolCard
            title="Seat Plan Generator"
            description="Upload student matrices to generate optimized, randomized seating arrangements for exams."
            icon="Building2"
            href="/apps/seat-plan"
            status="planned"
          />
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-bold tracking-tight">Coming Soon</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Exam Countdown"
            description="Keep track of upcoming midterms and finals with real-time countdown timers."
            icon="Timer"
            href="#"
            status="planned"
          />
          <ToolCard
            title="Office Hours Booking"
            description="Reserve 1-on-1 counseling slots and view availability schedules dynamically."
            icon="CalendarDays"
            href="#"
            status="planned"
          />
        </div>
      </section>
    </div>
  );
}
