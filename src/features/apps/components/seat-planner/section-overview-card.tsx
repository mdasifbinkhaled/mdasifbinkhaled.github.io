// ────────────────────────────────────────────────
// Seat Planner — Section Overview Card
// ────────────────────────────────────────────────

import { Layers } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { type getSectionSummaries } from './export-utils';
import { SECTION_COLORS } from './types';

export function SectionOverviewCard({
  sections,
}: {
  sections: ReturnType<typeof getSectionSummaries>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="h-5 w-5" />
          Section Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.section}
            className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${SECTION_COLORS[(section.section - 1) % SECTION_COLORS.length]}`}
                />
                <span className="font-medium">Section {section.section}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {section.count} student{section.count === 1 ? '' : 's'}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {section.faculty
                ? `Faculty: ${section.faculty}`
                : 'Faculty name not set.'}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
