'use client';

// ────────────────────────────────────────────────
// Study Timer — weekly activity heatmap
// ────────────────────────────────────────────────

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { getHeatmapToneClass } from './study-timer.utils';

interface HeatmapData {
  cells: { date: Date; minutes: number }[];
  maxMinutes: number;
  columnLabels: string[];
}

interface ActivityHeatmapProps {
  heatmapData: HeatmapData;
  heatmapSummary: string;
}

export function ActivityHeatmap({
  heatmapData,
  heatmapSummary,
}: ActivityHeatmapProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-[10px] text-muted-foreground mb-1">
          {heatmapData.columnLabels.map((d, i) => (
            <span key={i} className="text-center">
              {d}
            </span>
          ))}
        </div>
        <div
          role="img"
          aria-label={`Weekly activity heatmap. ${heatmapSummary}`}
          className="grid grid-cols-7 gap-1"
        >
          {heatmapData.cells.map((cell, i) => {
            const intensity =
              cell.minutes > 0
                ? Math.max(0.15, cell.minutes / heatmapData.maxMinutes)
                : 0;
            return (
              <div
                key={i}
                title={`${cell.date.toLocaleDateString()}: ${cell.minutes}min`}
                aria-hidden="true"
                className={`aspect-square rounded-sm ${getHeatmapToneClass(intensity)}`}
              />
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-right">
          Last 7 weeks
        </p>
      </CardContent>
    </Card>
  );
}
