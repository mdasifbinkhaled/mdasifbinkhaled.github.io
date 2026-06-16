'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids is currently the "active" one in the
 * viewport, using a single IntersectionObserver. Pass a stable `ids` array
 * (e.g. a module constant or a memoized value) to avoid re-subscribing.
 */
export function useScrollspy(
  ids: readonly string[],
  rootMargin = '-20% 0px -70% 0px'
): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin, threshold: 0 }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
