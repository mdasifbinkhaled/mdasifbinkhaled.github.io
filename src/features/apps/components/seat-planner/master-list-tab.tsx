// ────────────────────────────────────────────────
// Seat Planner — Master List Tab content
// ────────────────────────────────────────────────

import type { buildSeatPlanTableColumns } from './export-utils';
import { getSeatPlanTableValue } from './export-utils';
import { Th } from './shared-ui';
import type { AllocationResult, Student } from './types';

export function MasterListTab({
  allStudentsSorted,
  masterColumns,
  allocations,
  onReassign,
}: {
  allStudentsSorted: Student[];
  masterColumns: ReturnType<typeof buildSeatPlanTableColumns>;
  allocations: AllocationResult['allocations'];
  onReassign: (studentId: string, targetRoom: string) => void;
}) {
  return (
    <div
      data-seat-plan-snapshot="true"
      className="space-y-4 rounded-xl border bg-muted/10 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Master seating list</h3>
          <p className="text-sm text-muted-foreground">
            Reassign rooms inline when needed. The printable output uses fixed
            room labels instead of these controls.
          </p>
        </div>
        <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
          {allStudentsSorted.length} total assignment
          {allStudentsSorted.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="max-h-[30rem] overflow-auto">
          <table className="w-full min-w-[42rem] text-sm">
            <thead className="sticky top-0 bg-background/95 backdrop-blur">
              <tr>
                {masterColumns.map((column) => (
                  <Th
                    key={column.key}
                    data-seat-plan-col={
                      column.kind === 'extra' ? 'extra' : column.kind
                    }
                    className={
                      column.kind === 'sl'
                        ? 'w-12'
                        : column.kind === 'id'
                          ? 'w-28'
                          : column.kind === 'section'
                            ? 'w-16 text-center'
                            : column.kind === 'room'
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
              {allStudentsSorted.map((student, index) => (
                <tr key={student.id} className="hover:bg-muted/30">
                  {masterColumns.map((column) => (
                    <td
                      key={column.key}
                      data-seat-plan-col={
                        column.kind === 'extra' ? 'extra' : column.kind
                      }
                      data-seat-plan-select-cell={
                        column.kind === 'room' ? 'true' : undefined
                      }
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
                      {column.kind === 'room' ? (
                        <select
                          value={student.room ?? ''}
                          onChange={(e) =>
                            onReassign(student.id, e.target.value)
                          }
                          className="min-w-[9rem] rounded-md border bg-background px-2 py-1 text-xs focus:border-ring focus:outline-none"
                          aria-label={`Room assignment for ${student.name}`}
                        >
                          {allocations.map((allocation) => (
                            <option
                              key={allocation.room.uid}
                              value={allocation.room.name}
                            >
                              {allocation.room.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        getSeatPlanTableValue(student, column, index)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
