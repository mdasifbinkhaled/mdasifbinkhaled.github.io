// ────────────────────────────────────────────────
// Study Timer — pure helpers + types
// (no 'use client' — this file has zero side-effects)
// ────────────────────────────────────────────────

export type SessionType = 'focus' | 'short-break' | 'long-break';

export interface TimerSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

export interface SessionLog {
  type: SessionType;
  /** Seconds actually spent */
  duration: number;
  /** ISO string */
  completedAt: string;
}

export const DEFAULT_SETTINGS: TimerSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

export const STUDY_TOOL_SLUG = 'study-timer';

export const SESSION_TYPES = ['focus', 'short-break', 'long-break'] as const;

export function getSessionLabel(type: SessionType): string {
  switch (type) {
    case 'focus':
      return 'Focus';
    case 'short-break':
      return 'Short Break';
    case 'long-break':
      return 'Long Break';
  }
}

export function getSessionDuration(
  type: SessionType,
  settings: TimerSettings
): number {
  switch (type) {
    case 'focus':
      return settings.focusMinutes * 60;
    case 'short-break':
      return settings.shortBreakMinutes * 60;
    case 'long-break':
      return settings.longBreakMinutes * 60;
  }
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function getHeatmapToneClass(intensity: number): string {
  if (intensity <= 0) return 'bg-muted';
  if (intensity < 0.25) return 'bg-primary/20';
  if (intensity < 0.5) return 'bg-primary/35';
  if (intensity < 0.75) return 'bg-primary/55';
  return 'bg-primary/75';
}
