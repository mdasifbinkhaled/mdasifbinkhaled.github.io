import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/card';

export interface StatItem {
  /** Short label shown above the value. */
  label: string;
  /** Primary value — can be a number, formatted string, or a tiny node. */
  value: React.ReactNode;
  /** Optional tooltip-style hint shown below the value in muted text. */
  hint?: string;
  /** Optional icon shown next to the label. */
  icon?: React.ReactNode;
  /** Optional semantic tone tokens (default | success | warning | danger). */
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export interface StatsPanelProps {
  items: StatItem[];
  /** `vertical` — sticky right-rail card. `horizontal` — top strip of chips. */
  orientation?: 'vertical' | 'horizontal';
  /** Overall heading rendered above the list (vertical only). */
  title?: string;
  className?: string;
}

const TONE_CLASS: Record<NonNullable<StatItem['tone']>, string> = {
  default: 'text-foreground',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-red-600 dark:text-red-400',
};

/**
 * A responsive stats surface.
 *
 * - `orientation="vertical"` (default) renders a sticky Card with a stacked
 *   list of label/value rows — intended for the desktop right rail.
 * - `orientation="horizontal"` renders a scrollable strip of chips — intended
 *   for mobile or narrow layouts where a rail is not available.
 */
export function StatsPanel({
  items,
  orientation = 'vertical',
  title = 'Overview',
  className,
}: StatsPanelProps) {
  if (items.length === 0) return null;

  if (orientation === 'horizontal') {
    return (
      <div
        className={cn(
          'flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]',
          className
        )}
        aria-label={title}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-w-[7.5rem] shrink-0 flex-col gap-0.5 rounded-lg border bg-card px-3 py-2 text-sm"
          >
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </span>
            <span
              className={cn(
                'text-base font-semibold leading-tight',
                TONE_CLASS[item.tone ?? 'default']
              )}
            >
              {item.value}
            </span>
            {item.hint ? (
              <span className="text-[11px] text-muted-foreground">
                {item.hint}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card
      className={cn(
        'sticky top-24 flex max-h-[calc(100dvh-7rem)] flex-col gap-3 p-4',
        className
      )}
      aria-label={title}
    >
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <dl className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0"
          >
            <dt className="flex min-w-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.icon ? <span aria-hidden>{item.icon}</span> : null}
              <span className="truncate">{item.label}</span>
            </dt>
            <dd className="flex flex-col items-end gap-0.5 text-right">
              <span
                className={cn(
                  'text-lg font-semibold leading-none tabular-nums',
                  TONE_CLASS[item.tone ?? 'default']
                )}
              >
                {item.value}
              </span>
              {item.hint ? (
                <span className="text-[11px] text-muted-foreground">
                  {item.hint}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
