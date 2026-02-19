'use client';

import { ErrorFallback } from '@/shared/components/common/error-fallback';

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
      section="BRACU courses"
      fullUI={false}
    />
  );
}
