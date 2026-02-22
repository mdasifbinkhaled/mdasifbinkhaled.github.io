import type { Metadata } from 'next';
import { GradeCalculator } from '@/features/apps/components/grade-calculator';
import { Button } from '@/shared/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Grade Calculator | Student Apps | ${siteConfig.author}`,
  description:
    'Calculate your current course standing and dynamically project the required assignment scores for your desired final grade.',
  alternates: {
    canonical: '/apps/grade-calculator',
  },
};

export default function GradeCalculatorPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <div className="flex items-center gap-4 mb-4">
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
          <h1 className="text-3xl font-bold tracking-tight">
            Grade Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Simulate your course progress and determine exactly what you need to
            score on remaining coursework.
          </p>
        </div>
      </div>

      <GradeCalculator />
    </div>
  );
}
