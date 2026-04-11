'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function TrailingSlashRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === '/' || !pathname.endsWith('/')) {
      return;
    }

    const normalizedPath = pathname.replace(/\/+$/, '');
    const destination = `${normalizedPath}${window.location.search}${window.location.hash}`;

    window.location.replace(destination);
  }, [pathname]);

  return null;
}
