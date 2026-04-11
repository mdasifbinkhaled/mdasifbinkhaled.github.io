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

  const clearPendingClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    clearPendingClose();
    setIsOpen(true);
  }, [clearPendingClose]);

  const closeNow = useCallback(() => {
    clearPendingClose();
    setIsOpen(false);
  }, [clearPendingClose]);

  const handleMouseEnter = useCallback(() => {
    openNow();
  }, [openNow]);

  const handleMouseLeave = useCallback(() => {
    clearPendingClose();
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  }, [clearPendingClose, delay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    handleMouseEnter,
    handleMouseLeave,
    openNow,
    closeNow,
  } as const;
}
