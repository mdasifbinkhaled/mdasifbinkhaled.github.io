'use client';

import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import Link from 'next/link';

interface ErrorCardProps {
  error?: Error;
  reset?: () => void;
  section?: string;
  fullUI?: boolean;
  onReload?: () => void;
}

/**
 * A stateless, unified visual component for rendering application errors.
 * Replaces duplicated JSX previously found in error boundaries and fallbacks.
 */
export function ErrorCard({
  error,
  reset,
  section,
  fullUI = true,
  onReload,
}: ErrorCardProps) {
  if (!fullUI) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-destructive mb-4">
          Something went wrong{section ? ` on the ${section}` : ''}!
        </h2>
        {error && <p className="text-muted-foreground mb-6">{error.message}</p>}
        {reset && <Button onClick={reset}>Try again</Button>}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
          <CardDescription>
            We encountered an unexpected error. This has been logged and
            we&apos;ll look into it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-xs bg-muted p-3 rounded">
              <summary className="cursor-pointer font-medium mb-1">
                Error Details
              </summary>
              <pre className="mt-2 text-muted-foreground whitespace-pre-wrap font-mono">
                {error.message}
              </pre>
              {error.stack && (
                <pre className="mt-2 text-muted-foreground whitespace-pre-wrap font-mono">
                  {error.stack}
                </pre>
              )}
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            {reset && (
              <Button onClick={reset} variant="default" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try again
              </Button>
            )}
            {onReload && (
              <Button onClick={onReload} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
            )}
            <Button
              variant={reset || onReload ? 'ghost' : 'default'}
              asChild
              className="flex-1"
            >
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
