'use client';

import { Button } from '@/shared/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-semibold text-destructive mb-4">
        Something went wrong on the Contact page!
      </h2>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
