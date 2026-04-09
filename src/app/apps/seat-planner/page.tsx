import type { Metadata } from 'next';
import { SeatPlanner } from '@/features/apps';
import { Button } from '@/shared/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
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
      <div className="flex items-center gap-4 mb-4 print:hidden">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8 rounded-full"
        >
          <Link href="/apps">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to Tools</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seat Planner</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate exam seating arrangements with room assignments, master
            lists, and signature sheets. All processing happens in your browser.
          </p>
        </div>
      </div>

      <SeatPlanner />
    </div>
  );
}
