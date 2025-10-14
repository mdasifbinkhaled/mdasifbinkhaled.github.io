'use client';

import { ErrorFallback } from '@/shared/components/common';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorFallback error={error} reset={reset} fullUI={true} />;
}
