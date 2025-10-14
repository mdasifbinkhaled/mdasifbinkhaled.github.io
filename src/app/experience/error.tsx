'use client';

import { ErrorFallback } from '@/shared/components/common';

export default function Error({
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
      section="Experience page"
      fullUI={false}
    />
  );
}
