'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import Link from 'next/link';

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

  // Simple layout for section-specific errors
  if (!fullUI) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-destructive mb-4">
          Something went wrong{section ? ` on the ${section}` : ''}!
        </h2>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    );
  }

  // Full UI with card design for main error boundary
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred. Please try again or return to the
            homepage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground font-mono">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go to homepage
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
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
