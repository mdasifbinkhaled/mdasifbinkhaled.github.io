
"use client";

import { useState, useEffect, type ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback to show while not mounted
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Ensure fallback is a single valid ReactNode or null
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
