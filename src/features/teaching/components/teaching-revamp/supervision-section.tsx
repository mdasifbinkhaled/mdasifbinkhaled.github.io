'use client';

import { useState } from 'react';
import { Check, ChevronDown, Info, Loader } from 'lucide-react';
import type { SupervisionRecord } from '@/shared/types/teaching';
import { supervision } from '@/shared/lib/data/supervision';
import { Segmented } from '@/shared/components/ui/segmented';
import { cn } from '@/shared/lib/utils';

type StatusKey = 'all' | 'Ongoing' | 'Completed';

/**
 * §6 — supervision. A Sample badge + note while the data is draft. A Status
 * segmented filter; each row is an expandable button (`aria-expanded`) that
 * reveals the abstract + team-member chips (the Supervisor chip is
 * primary-highlighted as the lead).
 */
export function SupervisionSection() {
  const [status, setStatus] = useState<StatusKey>('all');

  const rows = supervision.rows.filter(
    (r) => status === 'all' || r.status === status
  );

  return (
    <>
      {supervision.draft && supervision.note && (
        <p className="-mt-0.5 mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info
            className="size-3.5 shrink-0 text-warning-emphasis"
            aria-hidden
          />
          {supervision.note}
        </p>
      )}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="flex flex-wrap items-center gap-4 border-b border-border px-6 py-3.5">
          <span className="text-sm text-muted-foreground">
            {rows.length} of {supervision.rows.length}{' '}
            {supervision.rows.length === 1 ? 'project' : 'projects'}
          </span>
          <div className="ml-auto">
            <Segmented<StatusKey>
              value={status}
              onChange={setStatus}
              label="Filter by status"
              size="sm"
              options={[
                { value: 'all', label: 'All' },
                { value: 'Ongoing', label: 'Ongoing' },
                { value: 'Completed', label: 'Completed' },
              ]}
            />
          </div>
        </div>

        <div
          aria-hidden
          className="grid grid-cols-[46px_1fr_104px_124px_104px] gap-4 bg-linear-to-b from-muted/55 to-muted/30 px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
        >
          <span />
          <span>Project</span>
          <span>Year</span>
          <span>Status</span>
          <span className="text-right">Team</span>
        </div>

        {rows.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">
            No projects with this status.
            <button
              type="button"
              onClick={() => setStatus('all')}
              className="ml-1.5 font-semibold text-primary hover:underline hover:underline-offset-[3px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              Reset
            </button>
          </div>
        ) : (
          rows.map((r) => <SupervisionRow key={r.topic} record={r} />)
        )}
      </div>
    </>
  );
}

function SupervisionRow({ record }: { record: SupervisionRecord }) {
  const [open, setOpen] = useState(false);
  const ongoing = record.status === 'Ongoing';
  const StatusIcon = ongoing ? Loader : Check;

  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'group grid w-full grid-cols-[46px_1fr_104px_124px_104px] items-center gap-4 px-6 py-3.5 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          open ? 'bg-primary/4' : 'hover:bg-muted/35'
        )}
      >
        <span
          className={cn(
            'grid size-[38px] shrink-0 place-items-center rounded-md',
            ongoing
              ? 'bg-success/12 text-success-emphasis'
              : 'bg-muted/90 text-muted-foreground'
          )}
        >
          <StatusIcon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-base font-semibold leading-snug">
            {record.topic}
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {record.level} · {record.members.length} members
          </span>
        </span>
        <span className="font-mono text-sm text-muted-foreground">
          {record.year}
        </span>
        <span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.04em]',
              ongoing
                ? 'bg-success/12 text-success-emphasis'
                : 'bg-muted/80 text-muted-foreground'
            )}
          >
            <span className="size-[5px] rounded-full bg-current" />
            {record.status}
          </span>
        </span>
        <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-primary">
          Details
          <ChevronDown
            className={cn(
              'size-3.5 transition-transform',
              open && 'rotate-180'
            )}
            aria-hidden
          />
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5.5 pl-[88px] pt-1">
          <p className="mb-4 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
            {record.abstract}
          </p>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Team members
          </p>
          <div className="flex flex-wrap gap-2.5">
            {record.members.map((m) => {
              const lead = m.role === 'Supervisor';
              return (
                <span
                  key={`${m.name}-${m.role}`}
                  className={cn(
                    'flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5',
                    lead
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border bg-background'
                  )}
                >
                  <span
                    className={cn(
                      'grid size-7 shrink-0 place-items-center rounded-full font-mono text-[10px] font-bold',
                      lead
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/80 text-muted-foreground'
                    )}
                  >
                    {m.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-tight">
                      {m.name}
                    </span>
                    <span className="mt-px block text-[10px] text-muted-foreground">
                      {m.role}
                    </span>
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
