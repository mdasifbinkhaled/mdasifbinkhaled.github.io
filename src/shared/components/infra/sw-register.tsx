'use client';

import { useEffect } from 'react';

/**
 * Registers the Workbox-generated service worker for offline caching.
 * The SW file is generated during postbuild into out/sw.js.
 * Registration is deferred until after page load to avoid blocking.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV === 'development'
    ) {
      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration failed — non-critical for a static portfolio
      });
    });
  }, []);

  return null;
}
