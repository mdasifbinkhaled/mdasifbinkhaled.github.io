'use client';

import { useEffect } from 'react';
import { LAYOUT } from '@/shared/config/constants';

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
      if (el) {
        const navbarHeight = LAYOUT.NAVBAR_HEIGHT;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      }
    };
    // Initial attempt after mount/render
    const t = window.setTimeout(scroll, 50);
    // React to hash changes

    let hashTimeoutId: number;
    const onHash = () => {
      hashTimeoutId = window.setTimeout(scroll, 0);
    };

    window.addEventListener('hashchange', onHash);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(hashTimeoutId);
      window.removeEventListener('hashchange', onHash);
    };
  }, [behavior]);

  return null;
}
