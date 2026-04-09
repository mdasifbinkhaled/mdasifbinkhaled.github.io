import type { Metadata } from 'next';
import { ExamCountdown } from '@/features/apps';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Exam Countdown | Apps | ${siteConfig.author}`,
  description:
    'Keep track of upcoming midterms and finals with real-time countdown timers.',
  alternates: {
    canonical: '/apps/exam-countdown',
  },
  openGraph: {
    title: `Exam Countdown | Apps | ${siteConfig.author}`,
    description:
      'Keep track of upcoming midterms and finals with real-time countdown timers.',
  },
};

export default function ExamCountdownPage() {
  return (
    <div className="container-responsive py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Exam Countdown</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Never miss an important date. Track your upcoming midterms, finals,
          and assignment milestones with precision timers.
        </p>
      </div>
      <ExamCountdown />
    </div>
  );
}
