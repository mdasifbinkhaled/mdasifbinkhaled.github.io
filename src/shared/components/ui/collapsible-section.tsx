'use client';

import type { ReactNode } from 'react';
import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface CollapsibleSectionProps {
  title: ReactNode;
  /** Optional badge after the title (e.g. a "Sample" flag). */
  badge?: ReactNode;
  /** Optional muted hint on the right of the header. */
  hint?: ReactNode;
  /** Controlled open state (a parent can drive an expand/collapse-all). */
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * A controlled collapsible block whose header is a real toggle button (`h2`
 * title + chevron + `aria-expanded`). The body is conditionally rendered (an
 * instant show/hide, not an animated height) so it stays reliable in
 * print/PDF/frozen-timeline contexts. Open state is owned by the parent so one
 * central control can expand/collapse several at once.
 */
export function CollapsibleSection({
  title,
  badge,
  hint,
  open,
  onToggle,
  children,
  className,
}: CollapsibleSectionProps) {
  const panelId = useId();
  return (
    <section className={className}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center gap-3 rounded-lg py-2 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {badge}
        <span className="grow" />
        {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div id={panelId} className="mt-4">
          {children}
        </div>
      )}
    </section>
  );
}
