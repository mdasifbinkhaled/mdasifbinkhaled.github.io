import { useEffect, useState } from 'react';

/**
 * Hook to detect user's motion preference
 * Returns true if user prefers reduced motion
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Motion-aware animation durations
 * Automatically adjusts based on user's motion preference
 */
export const useMotionDurations = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    fast: prefersReducedMotion ? '0ms' : '150ms',
    normal: prefersReducedMotion ? '0ms' : '300ms',
    slow: prefersReducedMotion ? '0ms' : '500ms',
  };
};

/**
 * Motion-safe animation classes
 * Returns empty string if user prefers reduced motion
 */
export const useMotionSafeClass = (animationClass: string): string => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? '' : animationClass;
};
