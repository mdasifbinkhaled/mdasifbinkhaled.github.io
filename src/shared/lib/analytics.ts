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

export const portfolioEvents = {
  publicationsFilter: (options: {
    queryLength: number;
    yearFilter: string;
    typeFilter: string;
    resultCount: number;
  }) => {
    trackEvent('publications_filter_used', {
      query_length: options.queryLength,
      year_filter: options.yearFilter,
      type_filter: options.typeFilter,
      result_count: options.resultCount,
    });
  },

  commandPaletteSearch: (queryLength: number) => {
    trackEvent('command_palette_search', {
      query_length: queryLength,
    });
  },

  commandPaletteSelect: (label: string, queryLength = 0) => {
    trackEvent('command_palette_select', {
      value: label,
      query_length: queryLength,
    });
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
