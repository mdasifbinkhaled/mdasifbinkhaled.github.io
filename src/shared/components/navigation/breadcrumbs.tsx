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
        const title = segment
          .replace(/-/g, ' ')
          .replace(/^\w/, (c) => c.toUpperCase());
        const Icon = pageIcons[segment as keyof typeof pageIcons];

        return (
          <div key={segment} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            {isLast ? (
              <div className="flex items-center gap-1 text-foreground font-medium">
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
