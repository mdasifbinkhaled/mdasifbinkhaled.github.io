'use client';

import { useState } from 'react';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { ContentColumn } from '@/shared/components/layout/content-column';
import { PageHeader } from '@/shared/components/layout/page-header';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { Badge } from '@/shared/components/ui/badge';
import { TeachingFigures } from './teaching-figures';
import { InstitutionsFilter } from './institutions-filter';
import { CoursePagesTable } from './course-pages-table';
import { TeachingRecord } from './teaching-record';
import { SupervisionSection } from './supervision-section';
import { TeachingAssistantsSection } from './teaching-assistants-section';
import type { InstitutionFilter } from './institution-data';

const INTRO = {
  headline: 'Eleven courses, two universities, and one running right now.',
  lead: 'I teach the computer-science core at IUB — algorithms, data structures, theory of computation, and the mathematics beneath them. The active course keeps its own page; everything below is the record.',
} as const;

const SECTION_IDS = ['pages', 'record', 'supervision', 'ta'] as const;
type SectionId = (typeof SECTION_IDS)[number];

type OpenMap = Record<SectionId, boolean>;
const ALL_OPEN: OpenMap = {
  pages: true,
  record: true,
  supervision: true,
  ta: true,
};

const sampleBadge = (
  <Badge
    variant="outline"
    className="border-warning/30 bg-warning/14 px-2 py-0.5 text-[10px] uppercase tracking-[0.04em] text-warning-emphasis"
  >
    Sample
  </Badge>
);

/**
 * Client orchestrator for the revamped `/teaching` index. Owns the institution
 * filter (shared header ↔ record) and the open state of the four collapsible
 * sections (driven both individually and by one Expand/Collapse-all control).
 */
export function TeachingIndex() {
  const [inst, setInst] = useState<InstitutionFilter>('all');
  const [open, setOpen] = useState<OpenMap>(ALL_OPEN);

  const allOpen: boolean = SECTION_IDS.every((id) => open[id]);
  const toggleAll = () => {
    const next = !allOpen;
    setOpen({ pages: next, record: next, supervision: next, ta: next });
  };
  const toggle = (id: SectionId) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  const ExpandIcon = allOpen ? ChevronsDownUp : ChevronsUpDown;

  return (
    <ContentColumn width="wide" gap="space-y-9">
      {/* §1 — header card with the institutions filter on the right */}
      <div className="grid grid-cols-1 items-start gap-10 rounded-xl border border-border bg-card p-8 shadow-xs lg:grid-cols-[minmax(0,1fr)_360px] lg:p-9">
        <PageHeader
          eyebrow="Teaching"
          title={INTRO.headline}
          lead={INTRO.lead}
        />
        <InstitutionsFilter active={inst} onSelect={(next) => setInst(next)} />
      </div>

      {/* §2 — figure strip */}
      <TeachingFigures />

      {/* §3 — section-controls bar */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {SECTION_IDS.length} sections
        </span>
        <button
          type="button"
          onClick={toggleAll}
          aria-pressed={allOpen}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ExpandIcon className="size-3.5" aria-hidden />
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* §4–§7 — collapsible sections */}
      <CollapsibleSection
        title="Course pages"
        hint="Courses with a dedicated page"
        open={open.pages}
        onToggle={() => toggle('pages')}
      >
        <CoursePagesTable />
      </CollapsibleSection>

      <CollapsibleSection
        title="Teaching"
        hint="The complete record"
        open={open.record}
        onToggle={() => toggle('record')}
      >
        <TeachingRecord inst={inst} onClearInst={() => setInst('all')} />
      </CollapsibleSection>

      <CollapsibleSection
        title="Supervision"
        badge={sampleBadge}
        hint="Thesis · directed research"
        open={open.supervision}
        onToggle={() => toggle('supervision')}
      >
        <SupervisionSection />
      </CollapsibleSection>

      <CollapsibleSection
        title="Teaching assistants"
        badge={sampleBadge}
        hint="Students who supported my courses"
        open={open.ta}
        onToggle={() => toggle('ta')}
      >
        <TeachingAssistantsSection />
      </CollapsibleSection>
    </ContentColumn>
  );
}
