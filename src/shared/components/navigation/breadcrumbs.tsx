'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatBreadcrumbTitle } from '@/shared/lib/course-utils';
import { mainNavItems } from '@/shared/config/navigation';
import { navIconMap } from '@/shared/lib/nav-icon-map';

/** Build a lookup from URL segment → icon name using navigation config */
const segmentIconMap: Record<string, string> = {};
for (const item of mainNavItems) {
  const segment = item.href.replace(/^\//, '') || 'home';
  if (item.icon) segmentIconMap[segment] = item.icon;
}

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
        {(() => {
          const HomeIcon = navIconMap['Home'];
          return HomeIcon ? <HomeIcon className="w-4 h-4" /> : null;
        })()}
        <span className="hidden sm:inline">Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        // Smart title formatting using shared utility
        const title = formatBreadcrumbTitle(segment);

        const iconName = segmentIconMap[segment];
        const Icon = iconName ? navIconMap[iconName] : undefined;

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
