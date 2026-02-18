'use client';

import { ErrorFallback } from '@/shared/components/common/error-fallback';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorFallback error={error} reset={reset} fullUI={true} />;
}
