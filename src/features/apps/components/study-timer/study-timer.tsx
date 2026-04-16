'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Settings2,
  Coffee,
  BookOpen,
  SkipForward,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type SessionType = 'focus' | 'short-break' | 'long-break';

interface TimerSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

interface SessionLog {
  type: SessionType;
  duration: number; // seconds actually spent
  completedAt: string; // ISO string
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

const STORAGE_KEY_SETTINGS = 'abk_study_timer_settings';
const STORAGE_KEY_LOG = 'abk_study_timer_log';

function getSessionLabel(type: SessionType): string {
  switch (type) {
    case 'focus':
      return 'Focus';
    case 'short-break':
      return 'Short Break';
    case 'long-break':
      return 'Long Break';
  }
}

function getSessionDuration(
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

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function StudyTimer() {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('focus');
  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_SETTINGS.focusMinutes * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [todayLog, setTodayLog] = useState<SessionLog[]>([]);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings) as TimerSettings;

        setSettings(parsed);

        setSecondsLeft(parsed.focusMinutes * 60);
      }
    } catch {
      // ignore
    }

    try {
      const savedLog = localStorage.getItem(STORAGE_KEY_LOG);
      if (savedLog) {
        const parsed = JSON.parse(savedLog) as SessionLog[];
        // Filter to today only
        const today = new Date().toDateString();

        setTodayLog(
          parsed.filter((l) => new Date(l.completedAt).toDateString() === today)
        );
      }
    } catch {
      // ignore
    }

    setMounted(true);
  }, []);

  // Persist settings
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    }
  }, [settings, mounted]);

  // Persist log
  useEffect(() => {
    if (mounted && todayLog.length > 0) {
      localStorage.setItem(STORAGE_KEY_LOG, JSON.stringify(todayLog));
    }
  }, [todayLog, mounted]);

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Session complete
  useEffect(() => {
    if (secondsLeft === 0 && mounted) {
      setIsRunning(false);

      const duration = getSessionDuration(sessionType, settings);
      const log: SessionLog = {
        type: sessionType,
        duration,
        completedAt: new Date().toISOString(),
      };
      setTodayLog((prev) => [...prev, log]);

      // Auto-advance
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const switchSession = useCallback(
    (type: SessionType) => {
      setSessionType(type);
      setSecondsLeft(getSessionDuration(type, settings));
      setIsRunning(false);
    },
    [settings]
  );

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(getSessionDuration(sessionType, settings));
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
          setSecondsLeft(num * 60);
          setIsRunning(false);
        }
        return updated;
      });
    },
    [sessionType]
  );

  // Today's stats
  const todayFocusSessions = todayLog.filter((l) => l.type === 'focus').length;
  const todayFocusMinutes = Math.round(
    todayLog
      .filter((l) => l.type === 'focus')
      .reduce((sum, l) => sum + l.duration, 0) / 60
  );

  const totalDuration = getSessionDuration(sessionType, settings);
  const progress =
    totalDuration > 0
      ? ((totalDuration - secondsLeft) / totalDuration) * 100
      : 0;

  if (!mounted) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* Main Timer */}
      <div className="space-y-6">
        {/* Session Type Tabs */}
        <div className="flex gap-2">
          {(['focus', 'short-break', 'long-break'] as const).map((type) => (
            <button
              key={type}
              onClick={() => switchSession(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sessionType === type
                  ? type === 'focus'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-emerald-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type === 'focus' ? (
                <BookOpen className="h-4 w-4" />
              ) : (
                <Coffee className="h-4 w-4" />
              )}
              {getSessionLabel(type)}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <Card
          className={`overflow-hidden ${sessionType === 'focus' ? 'border-primary/20' : 'border-emerald-500/20'}`}
        >
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-8">
              {/* Progress Ring */}
              <div className="relative w-64 h-64">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted/30"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className={`transition-all duration-1000 ${sessionType === 'focus' ? 'text-primary' : 'text-emerald-500'}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-bold tabular-nums tracking-tighter">
                    {formatTime(secondsLeft)}
                  </span>
                  <span className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-widest">
                    {getSessionLabel(sessionType)}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  aria-label="Reset timer"
                  className="h-12 w-12"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => setIsRunning(!isRunning)}
                  aria-label={isRunning ? 'Pause timer' : 'Start timer'}
                  className={`h-14 w-14 rounded-full ${
                    sessionType !== 'focus'
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : ''
                  }`}
                >
                  {isRunning ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSkip}
                  aria-label="Skip to next session"
                  className="h-12 w-12"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Focus counter */}
              <div className="flex gap-2">
                {Array.from({ length: settings.sessionsBeforeLongBreak }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i < focusCount % settings.sessionsBeforeLongBreak
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Today's Stats */}
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

        {/* Settings */}
        <Card>
          <CardHeader className="pb-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center justify-between w-full"
            >
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-muted-foreground" />
                Settings
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {showSettings ? 'Hide' : 'Show'}
              </span>
            </button>
          </CardHeader>
          {showSettings && (
            <CardContent className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Focus Duration (min)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={settings.focusMinutes}
                  onChange={(e) =>
                    handleSettingsChange('focusMinutes', e.target.value)
                  }
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Short Break (min)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreakMinutes}
                  onChange={(e) =>
                    handleSettingsChange('shortBreakMinutes', e.target.value)
                  }
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Long Break (min)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreakMinutes}
                  onChange={(e) =>
                    handleSettingsChange('longBreakMinutes', e.target.value)
                  }
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Sessions Before Long Break
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.sessionsBeforeLongBreak}
                  onChange={(e) =>
                    handleSettingsChange(
                      'sessionsBeforeLongBreak',
                      e.target.value
                    )
                  }
                  className="h-9"
                />
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
