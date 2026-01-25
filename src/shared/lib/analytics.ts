// Analytics and performance tracking utilities
'use client';

// Analytics types for performance entries
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

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
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === 'development') {
      // Analytics disabled in dev
    }
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

// Performance tracking
export const performanceTracker = {
  // Track page load performance
  trackPageLoad: (page: string) => {
    if (typeof window === 'undefined') return;

    // Wait for the page to fully load
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      trackEvent('page_performance', {
        page,
        load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        dom_interactive: Math.round(
          navigation.domInteractive - navigation.fetchStart
        ),
        first_contentful_paint: getFirstContentfulPaint(),
        largest_contentful_paint: getLargestContentfulPaint(),
      });
    });
  },

  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window === 'undefined') return;

    // Cumulative Layout Shift (CLS)
    trackCLS();

    // First Input Delay (FID)
    trackFID();

    // Largest Contentful Paint (LCP)
    trackLCP();
  },
};

// Helper functions for performance metrics
function getFirstContentfulPaint(): number | undefined {
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(
    (entry) => entry.name === 'first-contentful-paint'
  );
  return fcpEntry ? Math.round(fcpEntry.startTime) : undefined;
}

function getLargestContentfulPaint(): number | undefined {
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        // This is async, so we can't return the value directly
        trackEvent('first_contentful_paint', {
          value: Math.round(lastEntry.startTime),
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  } catch {
    // Silently fail if PerformanceObserver is not supported
  }
  return undefined;
}

function trackCLS() {
  let clsValue = 0;
  const clsEntries: PerformanceEntry[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          clsEntries.push(entry);
          clsValue += layoutShiftEntry.value || 0;
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report CLS when the page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackEvent('web_vital_cls', {
          value: Math.round(clsValue * 1000) / 1000,
          entries: clsEntries.length,
        });
      }
    });
  } catch {
    // Silently fail if PerformanceObserver is not supported
  }
}

function trackFID() {
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as FirstInputEntry;
        trackEvent('web_vital_fid', {
          value: Math.round(fidEntry.processingStart - fidEntry.startTime),
        });
      }
    }).observe({ type: 'first-input', buffered: true });
  } catch {
    // Silently fail if PerformanceObserver is not supported
  }
}

function trackLCP() {
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      if (lastEntry) {
        trackEvent('web_vital_lcp', {
          value: Math.round(lastEntry.startTime),
        });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // Silently fail if PerformanceObserver is not supported
  }
}

// User behavior insights
export const userBehaviorTracker = {
  // Track scroll depth
  trackScrollDepth: (page: string) => {
    if (typeof window === 'undefined') return;

    let maxScroll = 0;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }

      // Debounce scroll tracking
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (maxScroll >= 90) {
          trackEvent('page_scroll_complete', { page, max_scroll: maxScroll });
        } else if (maxScroll >= 50) {
          trackEvent('page_scroll_halfway', { page, max_scroll: maxScroll });
        }
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  },

  // Track time spent on page
  trackTimeOnPage: (page: string) => {
    if (typeof window === 'undefined') return;

    const startTime = Date.now();

    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) {
        // Only track if spent more than 10 seconds
        trackEvent('time_on_page', {
          page,
          seconds: timeSpent,
        });
      }
    };

    // Track when user leaves the page
    window.addEventListener('beforeunload', trackTimeSpent);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) trackTimeSpent();
    });

    return trackTimeSpent;
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
