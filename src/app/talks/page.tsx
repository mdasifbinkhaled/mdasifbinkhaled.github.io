import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { TalksList } from '@/features/talks';

export const metadata: Metadata = {
  title: `Talks & Presentations | ${siteConfig.author}`,
  description: 'Speaking engagements, keynotes, and lecture seminars.',
  alternates: {
    canonical: '/talks',
  },
};

export default function TalksPage() {
  return <TalksList />;
}
