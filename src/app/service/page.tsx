import type { Metadata } from 'next';
import Link from 'next/link';

const TARGET = '/about#honors-awards';

export const metadata: Metadata = {
  title: 'Service — Redirecting',
  alternates: { canonical: '/about' },
};

/**
 * Static‑export‑safe redirect page.
 * React 19 hoists the <meta httpEquiv="refresh"> into <head>,
 * so the redirect works even without JavaScript.
 */
export default function ServicePage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <div className="flex items-center justify-center min-h-[50vh] text-center">
        <p className="text-muted-foreground">
          This page has moved.{' '}
          <Link href={TARGET} className="text-primary underline">
            Click here
          </Link>{' '}
          if not redirected automatically.
        </p>
      </div>
    </>
  );
}
