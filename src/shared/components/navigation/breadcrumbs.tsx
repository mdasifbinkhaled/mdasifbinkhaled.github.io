'use client';

import { ChevronRight, Home, BookOpen, Users, Award, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageIcons = {
  publications: BookOpen,
  teaching: Users,
  experience: Award,
  research: BookOpen,
  'service-awards': Award,
  cv: Award,
  contact: User,
  about: User,
} as const;

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm mb-6 px-4 py-2 bg-muted/50 rounded-lg"
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        // Smart title formatting
        let title: string;
        const institutionCodes = ['iub', 'bracu', 'nsu', 'aiub'];
        const courseCodePattern = /^[a-z]{2,4}\d{3,4}$/i;

        if (institutionCodes.includes(segment.toLowerCase())) {
          // Institution codes should be UPPERCASE
          title = segment.toUpperCase();
        } else if (courseCodePattern.test(segment)) {
          // Course codes: "cse211" -> "CSE 211"
          const match = segment.match(/^([a-z]+)(\d+)$/i);
          if (match && match[1] && match[2]) {
            title = `${match[1].toUpperCase()} ${match[2]}`;
          } else {
            title = segment.toUpperCase();
          }
        } else {
          // Normal title case for other segments
          title = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
        }

        const Icon = pageIcons[segment as keyof typeof pageIcons];

        return (
          <div key={segment} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            {isLast ? (
              <div
                className="flex items-center gap-1 text-foreground font-medium"
                aria-current="page"
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{title}</span>
              </div>
            ) : (
              <Link
                href={href}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{title}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
