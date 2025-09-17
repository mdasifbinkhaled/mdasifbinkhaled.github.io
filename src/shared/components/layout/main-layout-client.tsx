'use client';

import { type ReactNode, useState, useEffect } from 'react';
import { AppProviders } from './app-providers';

interface MainLayoutClientProps {
  children: ReactNode;
}

/**
 * Main layout client component - simplified to use composition pattern
 * @deprecated Consider using AppProviders directly in your layout
 */
export function MainLayoutClient({ children }: MainLayoutClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AppProviders>{children}</AppProviders>;
}
