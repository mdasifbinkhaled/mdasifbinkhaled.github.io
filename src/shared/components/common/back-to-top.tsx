'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { SCROLL } from '@/shared/config';

export const BackToTop = React.memo(function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > SCROLL.BACK_TO_TOP_THRESHOLD) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: SCROLL.TOP,
      behavior: SCROLL.BEHAVIOR,
    });
  }, []);

  useEffect(() => {
    // Check initial scroll position
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

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
});
