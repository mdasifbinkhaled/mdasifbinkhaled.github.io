'use client';

import Link from 'next/link';

/**
 * Skip to main content link for keyboard navigation accessibility
 */
export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="absolute left-4 top-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transform -translate-y-16 focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      tabIndex={1}
    >
      Skip to main content
    </Link>
  );
}
