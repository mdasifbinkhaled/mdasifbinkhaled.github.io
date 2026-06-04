'use client';

// ────────────────────────────────────────────────
// Study Timer — today's progress card + session log
// ────────────────────────────────────────────────

import { Timer } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import type { SessionLog } from './study-timer.utils';

interface TodayProgressProps {
  todayLog: SessionLog[];
  todayFocusSessions: number;
  todayFocusMinutes: number;
}

export function TodayProgress({
  todayLog,
  todayFocusSessions,
  todayFocusMinutes,
}: TodayProgressProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          Today&apos;s Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background rounded-lg border p-3 text-center">
            <span className="block text-2xl font-bold tabular-nums">
              {todayFocusSessions}
            </span>
            <span className="text-xs text-muted-foreground">Sessions</span>
          </div>
          <div className="bg-background rounded-lg border p-3 text-center">
            <span className="block text-2xl font-bold tabular-nums">
              {todayFocusMinutes}
            </span>
            <span className="text-xs text-muted-foreground">Minutes</span>
          </div>
        </div>
        {todayLog.length > 0 && (
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {todayLog
              .filter((l) => l.type === 'focus')
              .map((log, i) => (
                <div
                  key={i}
                  className="flex justify-between text-xs text-muted-foreground py-1 border-b border-border/50 last:border-0"
                >
                  <span>Session {i + 1}</span>
                  <span>
                    {Math.round(log.duration / 60)}min &middot;{' '}
                    {new Date(log.completedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
