import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { TeachingIndex } from '@/features/teaching';

export const metadata: Metadata = {
  title: 'Teaching',
  description: `${siteConfig.author}'s teaching — active courses with full pages, the complete teaching record across IUB and BRACU, and supervision history.`,
  alternates: { canonical: '/teaching' },
};

export default function TeachingPage() {
  return <TeachingIndex />;
}
