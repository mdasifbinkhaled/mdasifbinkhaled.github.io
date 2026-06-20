'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Search, Star, X } from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { allCourses, institutionNames } from '@/shared/lib/data/courses';
import { getCoursePath } from '@/shared/lib/course-utils';
import { Segmented } from '@/shared/components/ui/segmented';
import { cn } from '@/shared/lib/utils';
import {
  isPresentInstitution,
  type InstitutionFilter,
} from './institution-data';

type SortKey = 'newest' | 'rating' | 'code';
type TypeKey = 'all' | 'theory' | 'lab';

const SORT_LABEL: Record<SortKey, string> = {
  newest: 'Newest',
  rating: 'Top rated',
  code: 'Course code',
};

const SORTERS: Record<SortKey, (a: CourseData, b: CourseData) => number> = {
  newest: (a, b) => b.year - a.year,
  rating: (a, b) => (b.rating ?? -1) - (a.rating ?? -1),
  code: (a, b) => a.code.localeCompare(b.code),
};

const typeOf = (c: CourseData): 'lab' | 'theory' =>
  c.credits === 1 ? 'lab' : 'theory';

interface TeachingRecordProps {
  /** Active institution filter from the header (shared state). */
  inst: InstitutionFilter;
  /** Clear the institution filter (dismiss the chip). */
  onClearInst: () => void;
}

/**
 * §5 — the rich teaching record table. Toolbar: scope label / dismissible
 * filter chip · Type segmented · search · sort. Columns: Code · Title · Inst. ·
 * Term · Type · Evaluation (amber meter + ★ mono). The live (ongoing) row is
 * primary-tinted and links to its course page.
 */
export function TeachingRecord({ inst, onClearInst }: TeachingRecordProps) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [type, setType] = useState<TypeKey>('all');

  const q = query.trim().toLowerCase();

  const list = useMemo(() => {
    const filtered = allCourses.filter((c) => {
      const instOk = inst === 'all' || c.institution === inst;
      const typeOk = type === 'all' || typeOf(c) === type;
      const qOk =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q);
      return instOk && typeOk && qOk;
    });
    return filtered.sort(SORTERS[sort]);
  }, [inst, type, q, sort]);

  const scopeName =
    inst === 'all' ? 'all institutions' : institutionNames[inst];

  const reset = () => {
    setQuery('');
    setType('all');
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border px-6 py-3.5">
        <span className="text-sm text-muted-foreground">
          Showing{' '}
          {inst === 'all' ? (
            <strong className="font-semibold text-foreground">
              all institutions
            </strong>
          ) : (
            <button
              type="button"
              onClick={onClearInst}
              aria-label={`Clear ${scopeName} filter`}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 py-0.5 pl-2.5 pr-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/14 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {scopeName} <X className="size-3 opacity-70" aria-hidden />
            </button>
          )}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          <Segmented<TypeKey>
            value={type}
            onChange={setType}
            label="Filter by type"
            size="sm"
            options={[
              { value: 'all', label: 'All' },
              { value: 'theory', label: 'Theory' },
              { value: 'lab', label: 'Lab' },
            ]}
          />
          <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20">
            <Search
              className="size-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by code or title…"
              aria-label="Filter courses"
              className="w-[170px] max-w-[40vw] border-0 bg-transparent text-sm text-foreground outline-hidden placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="inline-flex text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            )}
          </div>
          <span className="relative inline-flex items-center">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort courses"
              className="h-9 cursor-pointer appearance-none rounded-lg border border-border bg-background py-0 pl-3 pr-8 text-sm font-medium text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {SORT_LABEL[k]}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 size-3.5 text-muted-foreground"
              aria-hidden
            />
          </span>
        </div>
      </div>

      {/* Table */}
      <div
        tabIndex={0}
        role="group"
        aria-label="Teaching record, scroll horizontally"
        className="overflow-x-auto focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div className="min-w-[560px]">
          <div
            aria-hidden
            className="grid grid-cols-[104px_minmax(0,1fr)_72px_112px_82px_108px] gap-4 bg-linear-to-b from-muted/55 to-muted/30 px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
          >
            <span>Code</span>
            <span>Title</span>
            <span>Inst.</span>
            <span>Term</span>
            <span>Type</span>
            <span className="text-right">Evaluation</span>
          </div>
          {list.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-muted-foreground">
              No courses match the current filters.
              <button
                type="button"
                onClick={reset}
                className="ml-1.5 font-semibold text-primary hover:underline hover:underline-offset-[3px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                Reset
              </button>
            </div>
          ) : (
            list.map((c) => <RecordRow key={c.id} course={c} />)
          )}
        </div>
      </div>
    </div>
  );
}

function RecordRow({ course: c }: { course: CourseData }) {
  const live = c.status === 'ongoing';
  const isLab = c.credits === 1;
  const term = `${c.semester} ${c.year}`;
  const present = isPresentInstitution(c.institution);

  const cells = (
    <>
      <span
        className={cn(
          'inline-flex items-center whitespace-nowrap font-mono text-sm font-semibold',
          live && 'text-primary'
        )}
      >
        {c.code}
      </span>
      <span className="min-w-0 truncate text-base font-medium" title={c.title}>
        {c.title}
      </span>
      <span>
        <span
          className={cn(
            'whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.02em]',
            present
              ? 'border-success/30 bg-success/8 text-success-emphasis'
              : 'border-border text-muted-foreground'
          )}
        >
          {c.institutionShort ?? c.institution}
        </span>
      </span>
      <span className="text-sm text-muted-foreground">{term}</span>
      <span>
        <span
          className={cn(
            'inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.04em]',
            isLab
              ? 'text-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))]'
              : 'bg-muted/80 text-muted-foreground'
          )}
        >
          {isLab ? 'Lab' : 'Theory'}
        </span>
      </span>
      <span className="flex items-center justify-end">
        {live ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
            Open <ArrowRight className="size-3.5" aria-hidden />
          </span>
        ) : typeof c.rating === 'number' && c.rating > 0 ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="h-[5px] w-[54px] overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-warning"
                style={{ width: `${(c.rating / 5) * 100}%` }}
              />
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-sm">
              <Star className="size-3 text-warning-emphasis" aria-hidden />
              {c.rating.toFixed(1)}
            </span>
          </span>
        ) : (
          <span className="font-mono text-sm text-muted-foreground/55">—</span>
        )}
      </span>
    </>
  );

  const className = cn(
    'grid grid-cols-[104px_minmax(0,1fr)_72px_112px_82px_108px] items-center gap-4 border-t border-border px-6 py-3.5 transition-colors first:border-t-0',
    live
      ? 'bg-primary/6 shadow-[inset_3px_0_0_hsl(var(--primary))] hover:bg-primary/10'
      : 'even:bg-muted/22 hover:bg-muted/35'
  );

  if (live) {
    return (
      <Link
        href={getCoursePath(c)}
        aria-label={`Open ${c.code} · ${c.title} course page`}
        className={cn(
          'group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          className
        )}
      >
        {cells}
      </Link>
    );
  }

  return <div className={className}>{cells}</div>;
}
