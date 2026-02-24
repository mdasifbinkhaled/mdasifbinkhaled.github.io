import type { Metadata } from 'next';
import { SeatPlanner } from '@/features/apps/components/seat-planner';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Seat Planner | Apps | ${siteConfig.author}`,
  description:
    'Generate exam seating arrangements with room assignments, master lists, and signature sheets — entirely in your browser.',
  alternates: {
    canonical: '/apps/seat-planner',
  },
};

export default function SeatPlannerPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <SeatPlanner />
    </div>
  );
}
