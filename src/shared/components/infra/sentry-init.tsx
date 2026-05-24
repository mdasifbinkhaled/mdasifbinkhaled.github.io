'use client';

import { useEffect } from 'react';

export function SentryInit() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) return;

    import('@sentry/browser').then((Sentry) => {
      Sentry.init({
        dsn,
        // Conservative defaults to limit Sentry billable events on a static
        // personal-portfolio site. Tune via NEXT_PUBLIC_SENTRY_DSN-bound env
        // overrides if real traffic exceeds the free tier budget.
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 0.5,
      });
    });
  }, []);

  return null;
}
