'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface CVErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CVError({ error, reset }: CVErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('CV Page Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-xl">CV Loading Error</CardTitle>
          <CardDescription>
            There was an error loading the CV viewer. This might be due to a PDF loading issue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <strong>Error details:</strong> {error.message}
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/cv/CV_Md_Asif_Bin_Khaled.pdf" target="_blank" rel="noopener noreferrer">
                Download CV Instead
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
