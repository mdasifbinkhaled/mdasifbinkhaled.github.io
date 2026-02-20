'use client';

import React, { useSyncExternalStore } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { SCROLL } from '@/shared/config';

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL.BACK_TO_TOP_THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

export function BackToTop() {
  const isVisible = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerSnapshot
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: SCROLL.TOP,
      behavior: SCROLL.BEHAVIOR,
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
