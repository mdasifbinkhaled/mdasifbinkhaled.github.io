import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface PageHeaderProps {
  /** The page title (rendered as the single `h1`). */
  title: ReactNode;
  /** Optional lead paragraph under the title. */
  lead?: ReactNode;
  /** Optional caps eyebrow above the title (e.g. "Teaching"). */
  eyebrow?: ReactNode;
  /** Optional right-aligned actions (only meaningful when `align="left"`). */
  actions?: ReactNode;
  /** Center the header (used by contact/publications) vs left (default). */
  align?: 'left' | 'center';
  /**
   * Apply the one sanctioned flourish — a `primary→primary/70` gradient on the
   * title (DESIGN.md §1/§3, hero `h1`s only). Off by default (calm foreground).
   */
  gradient?: boolean;
  className?: string;
}

/**
 * Canonical page masthead — the single `h1` per route + optional eyebrow/lead.
 * Replaces the ~5 hand-rolled `h1` recipes so the hero scale/weight/alignment
 * stay consistent. Title is `text-3xl sm:text-4xl font-bold tracking-tight`
 * (calm, restrained); gradient is opt-in and reserved for this hero level.
 */
export function PageHeader({
  title,
  lead,
  eyebrow,
  actions,
  align = 'left',
  gradient = false,
  className,
}: PageHeaderProps) {
  const centered = align === 'center';
  return (
    <header
      className={cn(
        centered ? 'text-center' : 'flex items-end justify-between gap-6',
        className
      )}
    >
      <div className={cn(centered && 'mx-auto', 'max-w-3xl')}>
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            'text-3xl font-bold tracking-tight text-balance sm:text-4xl',
            gradient &&
              'bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'
          )}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={cn(
              'mt-3 text-lg leading-relaxed text-muted-foreground',
              centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {!centered && actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}
