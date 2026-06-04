// ────────────────────────────────────────────────
// Seat Planner — off-screen PNG export document
// ────────────────────────────────────────────────

import type {
  buildSeatPlanTableColumns,
  getSectionSummaries,
} from './export-utils';
import { getSeatPlanTableValue } from './export-utils';
import type { SeatPlanResultsProps } from './seat-plan-results-types';
import type { Student } from './types';

// ── PngSummaryStat ──────────────────────────────

export function PngSummaryStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-r border-slate-200 px-4 py-3 last:border-b-0 even:border-r-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

// ── SeatPlanPngDocument ─────────────────────────

export function SeatPlanPngDocument({
  printRef,
  documentTitle,
  metaLine,
  organisationLine,
  allStudentsSorted,
  masterColumns,
  sectionSummary,
  stats,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
  documentTitle: string;
  metaLine: string;
  organisationLine: string;
  allStudentsSorted: Student[];
  masterColumns: ReturnType<typeof buildSeatPlanTableColumns>;
  sectionSummary: ReturnType<typeof getSectionSummaries>;
  stats: SeatPlanResultsProps['stats'];
}) {
  const exportWidth = Math.min(
    Math.max(980, 720 + masterColumns.length * 102),
    1680
  );
  const sectionLine = sectionSummary
    .map((item) =>
      item.faculty
        ? `Sec ${item.section} (${item.count}) · ${item.faculty}`
        : `Sec ${item.section} (${item.count})`
    )
    .join('  •  ');

  return (
    <div
      ref={printRef}
      data-seat-plan-png-export="true"
      aria-hidden="true"
      className="pointer-events-none fixed left-[-10000px] top-0 z-[-1] min-w-[980px] bg-white text-slate-900"
    >
      <article
        className="border border-slate-300 bg-white px-10 py-8 shadow-none"
        data-seat-plan-png-width={String(exportWidth)}
      >
        <header className="border-b-2 border-slate-900 pb-5">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
            Examination Seating Plan
          </p>
          <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight text-slate-950">
            {documentTitle}
          </h2>
          {metaLine || organisationLine ? (
            <p className="mt-2 text-[13px] leading-6 text-slate-600">
              {[metaLine, organisationLine].filter(Boolean).join(' • ')}
            </p>
          ) : null}
        </header>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-3">
            <p className="text-[13px] leading-6 text-slate-600">
              High-resolution master list export with fixed room labels, full
              row coverage, and preserved imported fields.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-6 text-slate-700">
              {sectionLine ||
                'Section summaries will appear here once students are imported.'}
            </div>
          </div>

          <div className="border border-slate-300 bg-white">
            <div className="border-b border-slate-300 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Export Summary
            </div>
            <div className="grid grid-cols-2 text-[12px]">
              <PngSummaryStat
                label="Assignments"
                value={stats.assigned.toLocaleString()}
              />
              <PngSummaryStat
                label="Rooms Used"
                value={stats.roomsUsed.toLocaleString()}
              />
              <PngSummaryStat
                label="Utilisation"
                value={`${stats.utilisation}%`}
              />
              <PngSummaryStat
                label="Unassigned"
                value={stats.unassigned.toLocaleString()}
              />
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden border border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-300 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                Master List
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {allStudentsSorted.length} assignment
                {allStudentsSorted.length === 1 ? '' : 's'}
              </p>
            </div>
            <p className="text-[12px] text-slate-600">
              Generated from the current seat allocation
            </p>
          </div>

          <table className="w-full border-collapse text-[13px] leading-[1.45]">
            <thead>
              <tr className="bg-white">
                {masterColumns.map((column) => (
                  <th
                    key={column.key}
                    data-seat-plan-col={
                      column.kind === 'extra' ? 'extra' : column.kind
                    }
                    className={
                      column.kind === 'sl'
                        ? 'border-b border-slate-300 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500'
                        : column.kind === 'section'
                          ? 'border-b border-slate-300 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500'
                          : 'border-b border-slate-300 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500'
                    }
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allStudentsSorted.map((student, index) => (
                <tr
                  key={`${student.id}-${index}`}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}
                >
                  {masterColumns.map((column) => (
                    <td
                      key={column.key}
                      data-seat-plan-col={
                        column.kind === 'extra' ? 'extra' : column.kind
                      }
                      className={
                        column.kind === 'sl'
                          ? 'border-b border-slate-200 px-3 py-2.5 text-center text-slate-500'
                          : column.kind === 'id'
                            ? 'border-b border-slate-200 px-3 py-2.5 font-mono text-[12px] text-slate-700'
                            : column.kind === 'section'
                              ? 'border-b border-slate-200 px-3 py-2.5 text-center'
                              : 'border-b border-slate-200 px-3 py-2.5'
                      }
                    >
                      {getSeatPlanTableValue(student, column, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  );
}
