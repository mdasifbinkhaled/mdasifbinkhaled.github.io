import type { Metadata } from 'next';
import { GpaCalculator } from '@/features/apps/components/gpa-calculator/gpa-calculator';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `GPA Calculator | Apps | ${siteConfig.author}`,
  description:
    'Compute your semester GPA and cumulative CGPA across multiple credit-weighted courses with this interactive tool.',
  alternates: {
    canonical: '/apps/gpa-calculator',
  },
  openGraph: {
    title: `GPA Calculator | Apps | ${siteConfig.author}`,
    description:
      'Compute your semester GPA and cumulative CGPA across multiple credit-weighted courses with this interactive tool.',
  },
};

export default function GpaCalculatorPage() {
  return (
    <div className="container-responsive py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">GPA Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Track your academic performance by calculating your semester Grade
          Point Average and projecting your overall Cumulative GPA.
        </p>
      </div>
      <GpaCalculator />
    </div>
  );
}
