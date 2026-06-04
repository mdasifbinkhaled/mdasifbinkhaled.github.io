// ────────────────────────────────────────────────
// Seat Planner — Room Utilisation Panel
// ────────────────────────────────────────────────

import { BarChart3 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import { getSectionSummaries } from './export-utils';
import {
  SECTION_COLORS,
  type RoomAllocation,
  type SectionFacultyMap,
} from './types';

export function RoomUtilisationPanel({
  allocations,
  sectionFaculty,
}: {
  allocations: RoomAllocation[];
  sectionFaculty: SectionFacultyMap;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Room Utilisation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {allocations.map((allocation) => {
          const occupancy = allocation.room.capacity
            ? Math.round(
                (allocation.students.length / allocation.room.capacity) * 100
              )
            : 0;
          const sectionSummary = getSectionSummaries(
            allocation.students,
            sectionFaculty
          );

          return (
            <div
              key={allocation.room.uid}
              className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    {allocation.room.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {allocation.students.length}/{allocation.room.capacity}{' '}
                    seats occupied
                  </p>
                </div>
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {occupancy}% full
                </span>
              </div>

              <Progress value={occupancy} className="mt-3 h-2.5" />

              <div className="mt-3 flex flex-wrap gap-2">
                {sectionSummary.map((item) => (
                  <span
                    key={`${allocation.room.uid}-${item.section}`}
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
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
