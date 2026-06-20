import type { ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type ColumnWidth = 'prose' | 'standard' | 'wide';

const WIDTH: Record<ColumnWidth, string> = {
  prose: 'max-w-3xl', // long-form reading (~65–72ch)
  standard: 'max-w-5xl', // most content pages
  wide: 'max-w-7xl', // dense/tabular layouts (teaching record, dashboards)
};

interface ContentColumnProps {
  children: ReactNode;
  /** Inner column max-width. Default `standard`. */
  width?: ColumnWidth;
  /** Vertical rhythm between direct children. Default `space-y-12`. */
  gap?: string;
  /** Wrapper element (default `div`; pass `main`/`section` where apt). */
  as?: ElementType;
  className?: string;
}

/**
 * The canonical page content column: the responsive outer frame
 * (`container-responsive`) + a centered inner max-width + one vertical rhythm.
 * Replaces the per-page `container-responsive > max-w-{2xl..7xl} mx-auto
 * space-y-{12..20}` drift with three named widths.
 */
export function ContentColumn({
  children,
  width = 'standard',
  gap = 'space-y-12',
  as: Tag = 'div',
  className,
}: ContentColumnProps) {
  return (
    <Tag className="container-responsive">
      <div className={cn('mx-auto', WIDTH[width], gap, className)}>
        {children}
      </div>
    </Tag>
  );
}
