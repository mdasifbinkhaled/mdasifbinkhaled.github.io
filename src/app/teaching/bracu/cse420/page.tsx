import type { Metadata } from 'next';
import Link from 'next/link';

const TARGET = '/teaching';

export const metadata: Metadata = {
  title: 'CSE 420 — Redirecting',
  alternates: { canonical: '/teaching' },
  robots: { index: false, follow: true },
};

/**
 * Static-export-safe redirect. CSE 420 (completed) is now a row in the Teaching
 * record rather than a standalone page. React 19 hoists the <meta refresh> into
 * <head>, so it redirects without JavaScript.
 */
export default function Cse420Redirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <div className="flex min-h-[50vh] items-center justify-center text-center">
        <p className="text-muted-foreground">
          This course moved to the{' '}
          <Link href={TARGET} className="text-primary underline">
            Teaching record
          </Link>
          .
        </p>
      </div>
    </>
  );
}
