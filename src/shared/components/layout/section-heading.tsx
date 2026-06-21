import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface SectionHeadingProps {
  /** Heading level — `h2` (default) or `h3` for nested sections. */
  as?: 'h2' | 'h3';
  children: ReactNode;
  /** Optional supporting line under the title. */
  description?: ReactNode;
  /** Optional right-aligned controls (filters, toggles). */
  actions?: ReactNode;
  /** `id` for `aria-labelledby` wiring. */
  id?: string;
  /** Extra classes on the heading element (e.g. layout/icon flex). */
  className?: string;
  /** Wrapper classes (e.g. spacing). */
  wrapperClassName?: string;
}

/**
 * The canonical section-title recipe (DESIGN.md §3):
 * `text-2xl font-semibold tracking-tight text-foreground` (h2), one step down
 * for h3. Never `font-bold`, never tinted `text-primary`, never gradient —
 * those are reserved for page hero `h1`s (see `PageHeader`).
 *
 * NOTE: adoption is currently opt-in / partial — several feature sections still
 * hand-roll the same literal. Prefer this primitive for new section headings;
 * migrating the remaining hand-rolled ones is a tracked consistency follow-up.
 * Keep the recipe here as the single source of truth either way.
 */
export function SectionHeading({
  as: Tag = 'h2',
  children,
  description,
  actions,
  id,
  className,
  wrapperClassName,
}: SectionHeadingProps) {
  const size = Tag === 'h2' ? 'text-2xl' : 'text-xl';
  return (
    <div
      className={cn(
        actions && 'flex items-start justify-between gap-4',
        wrapperClassName
      )}
    >
      <div>
        <Tag
          id={id}
          className={cn(
            size,
            'font-semibold tracking-tight text-foreground',
            className
          )}
        >
          {children}
        </Tag>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
