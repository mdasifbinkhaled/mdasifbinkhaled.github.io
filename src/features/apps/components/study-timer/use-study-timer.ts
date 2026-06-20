'use client';

// ────────────────────────────────────────────────
// Study Timer — state management hook
// ────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useToolStorage } from '@/shared/lib/storage';
import {
  DEFAULT_SETTINGS,
  STUDY_TOOL_SLUG,
  getSessionDuration,
  type SessionType,
  type TimerSettings,
  type SessionLog,
} from './study-timer.utils';

export function useStudyTimer() {
  const [settings, setSettings, { ready: settingsReady }] =
    useToolStorage<TimerSettings>(
      STUDY_TOOL_SLUG,
      'settings',
      DEFAULT_SETTINGS
    );
  const [showSettings, setShowSettings] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('focus');
  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_SETTINGS.focusMinutes * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [allLog, setAllLog, { ready: logReady }] = useToolStorage<SessionLog[]>(
    STUDY_TOOL_SLUG,
    'log',
    []
  );
  const mounted = settingsReady && logReady;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsLeftRef = useRef(DEFAULT_SETTINGS.focusMinutes * 60);
  const isRunningRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Keep a ref of the running state so the duration-sync effect can read it
  // without listing `isRunning` as a dependency (which would otherwise reset
  // the remaining time whenever the user pauses).
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  /** Play a short beep using the Web Audio API */
  const playAlarm = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
      // Second beep after a short gap
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.value = 880;
      gain2.gain.setValueAtTime(0.5, ctx.currentTime + 1);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);
      osc2.start(ctx.currentTime + 1);
      osc2.stop(ctx.currentTime + 1.8);
    } catch {
      // Web Audio not available
    }
  }, []);

  const switchSession = useCallback(
    (type: SessionType) => {
      const nextDuration = getSessionDuration(type, settings);
      secondsLeftRef.current = nextDuration;
      setSessionType(type);
      setSecondsLeft(nextDuration);
      setIsRunning(false);
    },
    [settings]
  );

  const completeSession = useCallback(() => {
    setIsRunning(false);
    playAlarm();

    const duration = getSessionDuration(sessionType, settings);
    const log: SessionLog = {
      type: sessionType,
      duration,
      completedAt: new Date().toISOString(),
    };
    setAllLog((prev) => [...prev, log]);

    if (sessionType === 'focus') {
      const newCount = focusCount + 1;
      setFocusCount(newCount);
      switchSession(
        newCount % settings.sessionsBeforeLongBreak === 0
          ? 'long-break'
          : 'short-break'
      );
      return;
    }

    switchSession('focus');
  }, [focusCount, playAlarm, sessionType, settings, setAllLog, switchSession]);

  // When settings or the session type change, sync the displayed countdown to
  // the new duration — but never while the timer is running, and never merely
  // because the user paused. `isRunning` is intentionally read from a ref and
  // kept out of the dependency array so pausing preserves the remaining time.
  useEffect(() => {
    if (!settingsReady) return;
    if (isRunningRef.current) return;
    const nextDuration = getSessionDuration(sessionType, settings);
    secondsLeftRef.current = nextDuration;
    setSecondsLeft(nextDuration);
  }, [sessionType, settings, settingsReady]);

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // Complete only once the clock has visibly reached 00:00 (ref hits 0 on
        // the prior tick), so the final 00:00 second is actually rendered.
        if (secondsLeftRef.current <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          completeSession();
          return;
        }

        setSecondsLeft((prev) => {
          const nextValue = Math.max(prev - 1, 0);
          secondsLeftRef.current = nextValue;
          return nextValue;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [completeSession, isRunning]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    const nextDuration = getSessionDuration(sessionType, settings);
    secondsLeftRef.current = nextDuration;
    setSecondsLeft(nextDuration);
  }, [sessionType, settings]);

  const handleSkip = useCallback(() => {
    setIsRunning(false);
    if (sessionType === 'focus') {
      const newCount = focusCount + 1;
      setFocusCount(newCount);
      if (newCount % settings.sessionsBeforeLongBreak === 0) {
        switchSession('long-break');
      } else {
        switchSession('short-break');
      }
    } else {
      switchSession('focus');
    }
  }, [sessionType, focusCount, settings, switchSession]);

  const handleSettingsChange = useCallback(
    (field: keyof TimerSettings, value: string) => {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 1) return;
      setSettings((prev) => {
        const updated = { ...prev, [field]: num };
        // Reset timer if changing the current session's duration
        if (
          (field === 'focusMinutes' && sessionType === 'focus') ||
          (field === 'shortBreakMinutes' && sessionType === 'short-break') ||
          (field === 'longBreakMinutes' && sessionType === 'long-break')
        ) {
          const nextDuration = num * 60;
          secondsLeftRef.current = nextDuration;
          setSecondsLeft(nextDuration);
          setIsRunning(false);
        }
        return updated;
      });
    },
    [sessionType, setSettings]
  );

  // Today's sessions derived from full log
  const todayStr = new Date().toDateString();
  const todayLog = useMemo(
    () =>
      allLog.filter((l) => new Date(l.completedAt).toDateString() === todayStr),
    [allLog, todayStr]
  );

  // Today's stats
  const todayFocusSessions = todayLog.filter((l) => l.type === 'focus').length;
  const todayFocusMinutes = Math.round(
    todayLog
      .filter((l) => l.type === 'focus')
      .reduce((sum, l) => sum + l.duration, 0) / 60
  );

  // Weekly heatmap: last 7 weeks (49 days)
  const heatmapData = useMemo(() => {
    const DAYS = 49;
    const DAY_MS = 86_400_000;
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    // Build a map: dateString → focus seconds
    const dayMap = new Map<string, number>();
    for (const entry of allLog) {
      if (entry.type !== 'focus') continue;
      const d = new Date(entry.completedAt);
      const key = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      ).toDateString();
      dayMap.set(key, (dayMap.get(key) ?? 0) + entry.duration);
    }
    // Generate array of DAYS cells ending today (immutable Date arithmetic)
    const cells: { date: Date; minutes: number }[] = [];
    for (let i = DAYS - 1; i >= 0; i--) {
      const d = new Date(todayStart - i * DAY_MS);
      const mins = Math.round((dayMap.get(d.toDateString()) ?? 0) / 60);
      cells.push({ date: d, minutes: mins });
    }
    const maxMinutes = Math.max(...cells.map((c) => c.minutes), 1);
    // Weekday labels aligned to grid columns: each column's weekday equals
    // (firstCell.getDay() + colIndex) % 7. Grid rows fill left→right.
    const weekdayShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const firstDay = cells[0]?.date.getDay() ?? 0;
    const columnLabels = Array.from(
      { length: 7 },
      (_, col) => weekdayShort[(firstDay + col) % 7] ?? ''
    );
    return { cells, maxMinutes, columnLabels };
  }, [allLog]);

  const heatmapSummary = useMemo(() => {
    const totalMinutes = heatmapData.cells.reduce(
      (sum, cell) => sum + cell.minutes,
      0
    );
    const activeDays = heatmapData.cells.filter(
      (cell) => cell.minutes > 0
    ).length;

    if (totalMinutes === 0) {
      return 'No focus sessions recorded in the last 7 weeks.';
    }

    return `${totalMinutes} focus minutes recorded across ${activeDays} active days in the last 7 weeks.`;
  }, [heatmapData]);

  const handleResetAll = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setAllLog([]);
    setFocusCount(0);
    setSessionType('focus');
    setIsRunning(false);
    secondsLeftRef.current = DEFAULT_SETTINGS.focusMinutes * 60;
    setSecondsLeft(DEFAULT_SETTINGS.focusMinutes * 60);
  }, [setSettings, setAllLog]);

  return {
    // state
    settings,
    showSettings,
    sessionType,
    secondsLeft,
    isRunning,
    focusCount,
    allLog,
    mounted,
    // derived
    todayLog,
    todayFocusSessions,
    todayFocusMinutes,
    heatmapData,
    heatmapSummary,
    // setters
    setIsRunning,
    setShowSettings,
    // handlers
    switchSession,
    handleReset,
    handleSkip,
    handleSettingsChange,
    handleResetAll,
  };
}
