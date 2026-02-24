// ────────────────────────────────────────────────
// Seat Planner — shared tiny UI helpers
// ────────────────────────────────────────────────

import { cn } from '@/shared/lib/utils';

// ── table header cell ───────────────────────────

export function Th({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn('px-3 py-2 text-left font-semibold text-xs', className)}>
      {children}
    </th>
  );
}

// ── dotted field (room sheet footer) ────────────

export function DottedField({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium whitespace-nowrap">{label}</span>
      <div className="flex-1 border-b border-dashed" />
    </div>
  );
}
