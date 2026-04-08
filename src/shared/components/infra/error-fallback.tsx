'use client';

import { useEffect } from 'react';
import { ErrorCard } from './error-card';

interface ErrorFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
  /**
   * Section name to display in error message (e.g., "About page", "Contact page")
   * If not provided, shows generic error message
   */
  section?: string;
  /**
   * If true, shows full UI with card design. If false, shows simple layout
   * @default true
   */
  fullUI?: boolean;
}

/**
 * Shared error fallback component for consistent error handling across the app.
 * Automatically logs errors to console in development mode.
 *
 * @example
 * // For main app error boundary
 * <ErrorFallback error={error} reset={reset} />
 *
 * @example
 * // For section-specific simple error
 * <ErrorFallback error={error} reset={reset} section="About page" fullUI={false} />
 */
export function ErrorFallback({
  error,
  reset,
  section,
  fullUI = true,
}: ErrorFallbackProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    const errorContext = section ? `${section} Error` : 'Application Error';
    console.error(errorContext, error);
  }, [error, section]);

  return (
    <ErrorCard error={error} reset={reset} section={section} fullUI={fullUI} />
  );
}

/**
 * Factory function to create a concise error boundary component for a specific section.
 * Reduces boilerplate in nested error.tsx files.
 */
export function createErrorBoundary(sectionName: string) {
  return function GenericErrorBoundary({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    return (
      <ErrorFallback
        error={error}
        reset={reset}
        section={sectionName}
        fullUI={false}
      />
    );
  };
}
