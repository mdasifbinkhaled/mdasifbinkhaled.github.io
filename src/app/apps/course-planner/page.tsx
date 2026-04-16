import type { Metadata } from 'next';
import { CoursePlanner } from '@/features/apps';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Course Planner | Apps | ${siteConfig.author}`,
  description:
    'Plan your course sequence with a topological prerequisite viewer. Load IUB presets or build your own curriculum map.',
  alternates: {
    canonical: '/apps/course-planner',
  },
  openGraph: {
    title: `Course Planner | Apps | ${siteConfig.author}`,
    description:
      'Plan your course sequence with a topological prerequisite viewer. Load IUB presets or build your own curriculum map.',
  },
};

export default function CoursePlannerPage() {
  return (
    <div className="container-responsive py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Course Planner</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Visualize prerequisite chains, mark completed courses, and discover
          which courses you can take next — all in topological order.
        </p>
      </div>
      <CoursePlanner />
    </div>
  );
}
