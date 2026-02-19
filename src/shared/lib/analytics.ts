// Analytics tracking utilities
'use client';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

/** Track a named event with optional properties */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean | undefined>
) => {
  if (typeof window === 'undefined' || !ANALYTICS_ENABLED) return;

  if (process.env.NODE_ENV === 'development') return;

  if (GA_MEASUREMENT_ID && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties as Record<string, unknown>);
  }
};

/** Academic-specific event tracking — only events currently wired up */
export const academicEvents = {
  viewPublication: (publicationId: string, publicationTitle: string) => {
    trackEvent('publication_viewed', {
      publication_id: publicationId,
      publication_title: publicationTitle,
    });
  },

  downloadPublication: (publicationId: string, publicationTitle: string) => {
    trackEvent('publication_downloaded', {
      publication_id: publicationId,
      publication_title: publicationTitle,
    });
  },

  viewCV: () => {
    trackEvent('cv_viewed');
  },

  downloadCV: () => {
    trackEvent('cv_downloaded');
  },
};

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set' | 'js',
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
