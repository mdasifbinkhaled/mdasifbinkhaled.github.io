'use client';

import { useEffect, useState } from 'react';
import { ThemeSelector } from '@/shared/components/ui/theme-selector';
import { useIsMobile } from '@/shared/hooks/use-mobile';

export function MobileThemeFAB() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only show on mobile devices after the client has mounted
  if (!isMounted || !isMobile) {
    return null;
  }

  return <ThemeSelector variant="floating" align="start" />;
}
