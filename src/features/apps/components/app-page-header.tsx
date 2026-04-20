import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/common/icons';
import { getAppBySlug } from '@/shared/config/apps';

interface AppPageHeaderProps {
  /** App slug — used to look up title/description/icon from the apps config. */
  slug: string;
  /** Override the title (falls back to config). */
  title?: string;
  /** Override the description (falls back to config). */
  description?: string;
  /** Extra class names (e.g. `print:hidden` for printable tool pages). */
  className?: string;
}

/**
 * Consistent header for every tool page under `/apps/*`.
 *
 * Renders: back link to `/apps`, icon badge, title, description.
 * All text is data-driven from `src/shared/config/apps.ts` via the slug.
 */
export function AppPageHeader({
  slug,
  title,
  description,
  className = '',
}: AppPageHeaderProps) {
  const app = getAppBySlug(slug);
  const headingText = title ?? app.title;
  const descText = description ?? app.description;

  return (
    <header className={`flex flex-col gap-4 ${className}`}>
      <div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 px-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/apps">
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span>Back to Apps</span>
          </Link>
        </Button>
      </div>

      <div className="flex items-start gap-4">
        <div
          className="shrink-0 p-3 rounded-xl bg-primary/10 text-primary"
          aria-hidden
        >
          <Icon name={app.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">{headingText}</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">{descText}</p>
        </div>
      </div>
    </header>
  );
}
