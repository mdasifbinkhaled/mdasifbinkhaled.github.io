"use client";

import { useState, useEffect, type ReactNode } from 'react';

interface ClientMountProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Prevents hydration mismatches by only rendering children after client mount
 */
export function ClientMountProvider({ children, fallback }: ClientMountProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      fallback || (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto p-4">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
