import type { Metadata } from 'next';
import { AppsHub } from '@/features/apps';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: `Apps | ${siteConfig.author}`,
  description:
    'A suite of interactive academic utilities including grade calculators, seat planners, and study aids.',
  alternates: {
    canonical: '/apps',
  },
  openGraph: {
    title: `Apps | ${siteConfig.author}`,
    description:
      'A suite of interactive academic utilities including grade calculators, seat planners, and study aids.',
  },
};

export default function AppsPage() {
  return <AppsHub />;
}
