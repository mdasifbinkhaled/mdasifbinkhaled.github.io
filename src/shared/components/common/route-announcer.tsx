'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

/**
 * RouteAnnouncer: Ensures screen readers are notified of pushState
 * navigation changes in Next.js SPAs by updating an aria-live region.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Slight delay mimicking the DOM repainting the new page title
    const timeout = setTimeout(() => {
      // Document title should typically be updated by Next.js metadata by now
      setAnnouncement(`Navigated to: ${document.title || 'New page'}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <VisuallyHidden>
      <div aria-live="polite" aria-atomic="true" id="route-announcer">
        {announcement}
      </div>
    </VisuallyHidden>
  );
}
