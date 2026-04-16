import type { Metadata } from 'next';
import { StudyTimer } from '@/features/apps';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Study Timer | Apps | ${siteConfig.author}`,
  description:
    'Pomodoro-style study timer with configurable focus and break intervals, session tracking, and daily stats.',
  alternates: {
    canonical: '/apps/study-timer',
  },
  openGraph: {
    title: `Study Timer | Apps | ${siteConfig.author}`,
    description:
      'Pomodoro-style study timer with configurable focus and break intervals, session tracking, and daily stats.',
  },
};

export default function StudyTimerPage() {
  return (
    <div className="container-responsive py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Study Timer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Stay focused with the Pomodoro technique. Alternate between deep-work
          sessions and timed breaks to maximize productivity.
        </p>
      </div>
      <StudyTimer />
    </div>
  );
}
