// Analytics and performance tracking utilities
'use client';

// Configure analytics with environment variables
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
const isStaticMode = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

// Track user interactions for academic portfolio analytics
export const trackEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean | undefined>
) => {
  if (typeof window === 'undefined' || !ANALYTICS_ENABLED) return;

  // For development, just log events
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  // Google Analytics 4 (gtag)
  if (GA_MEASUREMENT_ID && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties as Record<string, unknown>);
  }

  // Custom analytics endpoint (if configured)
  if (analyticsEndpoint && !isStaticMode) {
    fetch(analyticsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, properties }),
    }).catch(() => {
      // Silently fail - analytics should never break the app
    });
  }
};

// Academic-specific event tracking
export const academicEvents = {
  // Publication interactions
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

  expandAbstract: (publicationId: string) => {
    trackEvent('abstract_expanded', {
      publication_id: publicationId,
    });
  },

  // Course interactions
  viewCourse: (courseId: string, courseTitle: string) => {
    trackEvent('course_viewed', {
      course_id: courseId,
      course_title: courseTitle,
    });
  },

  expandCourseDetails: (courseId: string) => {
    trackEvent('course_details_expanded', {
      course_id: courseId,
    });
  },

  // CV interactions
  viewCV: () => {
    trackEvent('cv_viewed');
  },

  downloadCV: () => {
    trackEvent('cv_downloaded');
  },

  // Search interactions
  search: (query: string, resultsCount: number) => {
    trackEvent('search_performed', {
      query: query.toLowerCase(),
      results_count: resultsCount,
    });
  },

  filterApplied: (filterType: string, filterValue: string) => {
    trackEvent('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
    });
  },

  // Navigation
  pageView: (page: string) => {
    trackEvent('page_view', {
      page,
    });
  },

  externalLinkClick: (url: string, context: string) => {
    trackEvent('external_link_clicked', {
      url,
      context,
    });
  },

  // Contact
  contactFormSubmit: (method: string) => {
    trackEvent('contact_form_submitted', {
      method,
    });
  },

  // Theme
  themeChanged: (theme: string) => {
    trackEvent('theme_changed', {
      theme,
    });
  },
};

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set' | 'js',
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
