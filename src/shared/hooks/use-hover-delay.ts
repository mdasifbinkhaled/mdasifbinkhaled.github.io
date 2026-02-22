import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Manages open/close state for hover-triggered menus with a configurable hide delay.
 * Prevents flicker when the cursor briefly leaves the target element.
 *
 * @param delay - Milliseconds to wait before closing (default: 200)
 * @returns State and mouse-event handlers
 */
export function useHoverDelay(delay = 200) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  }, [delay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isOpen, handleMouseEnter, handleMouseLeave } as const;
}
