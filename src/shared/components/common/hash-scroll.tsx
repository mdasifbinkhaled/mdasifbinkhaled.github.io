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
      if (el) {
        // Account for sticky navbar height (approximately 5rem = 80px)
        const navbarHeight = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      }
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
