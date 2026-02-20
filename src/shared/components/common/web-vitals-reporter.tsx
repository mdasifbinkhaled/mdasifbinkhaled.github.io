'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * WebVitalsReporter: Automatically hooks into Next.js performance metrics
 * and forwards LCP, FID, CLS, FCP, TTFB, and INP directly to Google Analytics 4.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Check if the global gtag function exists (inserted by layout.tsx)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ), // values must be integers
        event_label: metric.id, // id unique to current page load
        non_interaction: true, // avoids affecting bounce rate
      });
    }
  });

  return null;
}
