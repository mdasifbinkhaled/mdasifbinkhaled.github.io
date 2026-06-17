import type { Metadata } from 'next';
import Link from 'next/link';

const TARGET = '/teaching';

export const metadata: Metadata = {
  title: 'Teaching — Redirecting',
  alternates: { canonical: '/teaching' },
  robots: { index: false, follow: true },
};

/**
 * Static-export-safe redirect. The per-institution listing was folded into the
 * single /teaching page (Courses + Teaching record). React 19 hoists the
 * <meta httpEquiv="refresh"> into <head>, so it redirects without JavaScript.
 */
export default function IubTeachingRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <div className="flex min-h-[50vh] items-center justify-center text-center">
        <p className="text-muted-foreground">
          This page has moved to{' '}
          <Link href={TARGET} className="text-primary underline">
            Teaching
          </Link>
          .
        </p>
      </div>
    </>
  );
}
