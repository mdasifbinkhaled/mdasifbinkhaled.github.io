'use client';

import { useEffect } from 'react';

export function SentryInit() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) return;

    import('@sentry/browser').then((Sentry) => {
      Sentry.init({
        dsn,
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
    });
  }, []);

  return null;
}
