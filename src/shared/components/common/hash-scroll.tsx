'use client';

import { useEffect } from 'react';

interface HashScrollProps {
  behavior?: ScrollBehavior;
}

export function HashScroll({ behavior = 'smooth' }: HashScrollProps) {
  useEffect(() => {
    const scroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior, block: 'start' });
    };
    // Initial attempt after mount/render
    const t = window.setTimeout(scroll, 50);
    // React to hash changes
    const onHash = () => setTimeout(scroll, 0);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('hashchange', onHash);
    };
  }, [behavior]);

  return null;
}
