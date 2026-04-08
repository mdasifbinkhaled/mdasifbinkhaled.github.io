import type { Metadata } from 'next';
import { OfficeHoursBooker } from '@/features/apps/components/office-hours/office-hours-booker';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Office Hours Booking | Apps | ${siteConfig.author}`,
  description:
    'Reserve 1-on-1 counseling slots and view availability schedules dynamically.',
  alternates: {
    canonical: '/apps/office-hours',
  },
  openGraph: {
    title: `Office Hours Booking | Apps | ${siteConfig.author}`,
    description:
      'Reserve 1-on-1 counseling slots and view availability schedules dynamically.',
  },
};

export default function OfficeHoursPage() {
  return (
    <div className="container-responsive py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Office Hours & Counseling
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Reserve time for 1-on-1 mentorship, academic counseling, and deep
          dives into lecture material.
        </p>
      </div>
      <OfficeHoursBooker />
    </div>
  );
}
