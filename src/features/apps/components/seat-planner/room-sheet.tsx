// ────────────────────────────────────────────────
// Seat Planner — Room Sheet (interactive table)
// ────────────────────────────────────────────────

import type { buildSeatPlanTableColumns } from './export-utils';
import {
  buildRoomFacultySummary,
  getSeatPlanTableValue,
  getSectionSummaries,
} from './export-utils';
import { DottedField, Th } from './shared-ui';
import {
  SECTION_COLORS,
  type RoomAllocation,
  type SectionFacultyMap,
} from './types';

export function RoomSheet({
  alloc,
  columns,
  sectionFaculty,
}: {
  alloc: RoomAllocation;
  columns: ReturnType<typeof buildSeatPlanTableColumns>;
  sectionFaculty: SectionFacultyMap;
}) {
  const sectionSummary = getSectionSummaries(alloc.students, sectionFaculty);
  const facultySummary = buildRoomFacultySummary(alloc, sectionFaculty, 120);

  return (
    <div className="space-y-4 rounded-xl border bg-muted/10 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Room {alloc.room.name}</h3>
          <p className="text-sm text-muted-foreground">
            {alloc.students.length} assigned · {alloc.room.capacity} capacity
          </p>
        </div>
        <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
          {Math.round((alloc.students.length / alloc.room.capacity) * 100)}%
          utilised
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sectionSummary.map((item) => (
          <span
            key={`${alloc.room.uid}-section-${item.section}`}
            className="inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${SECTION_COLORS[(item.section - 1) % SECTION_COLORS.length]}`}
            />
            <span>
              Sec {item.section} · {item.count}
              {item.faculty ? ` · ${item.faculty}` : ''}
            </span>
          </span>
        ))}
      </div>

      {facultySummary ? (
        <div className="rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground">
          Faculty: {facultySummary}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border bg-background">
        <table className="min-w-max text-sm">
          <thead className="bg-background/95">
            <tr>
              {columns.map((column) => (
                <Th
                  key={column.key}
                  className={
                    column.kind === 'sl'
                      ? 'w-12'
                      : column.kind === 'id'
                        ? 'w-28'
                        : column.kind === 'section'
                          ? 'w-16 text-center'
                          : column.kind === 'signature'
                            ? 'w-40'
                            : column.kind === 'extra'
                              ? 'min-w-[8rem]'
                              : undefined
                  }
                >
                  {column.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {alloc.students.map((student, index) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-muted/30"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={
                      column.kind === 'sl'
                        ? 'px-3 py-2 text-muted-foreground'
                        : column.kind === 'id'
                          ? 'px-3 py-2 font-mono text-xs'
                          : column.kind === 'section'
                            ? 'px-3 py-2 text-center'
                            : 'px-3 py-2'
                    }
                  >
                    {getSeatPlanTableValue(student, column, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-3 text-sm">
        <DottedField label="Total Present" />
        <DottedField label="Total Absent" />
        <DottedField label="Invigilator Name" />
        <DottedField label="Invigilator Signature" />
      </div>
    </div>
  );
}
