'use client';

import {
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Coffee,
  SkipForward,
} from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ToolSettings } from '@/shared/components/common/tool-settings';
import { useStudyTimer } from './use-study-timer';
import { TimerSettingsPanel } from './timer-settings-panel';
import { ActivityHeatmap } from './activity-heatmap';
import { TodayProgress } from './today-progress';
import {
  STUDY_TOOL_SLUG,
  SESSION_TYPES,
  getSessionLabel,
  getSessionDuration,
  formatTime,
  type SessionType,
} from './study-timer.utils';

export function StudyTimer() {
  const {
    settings,
    showSettings,
    sessionType,
    secondsLeft,
    isRunning,
    focusCount,
    mounted,
    todayLog,
    todayFocusSessions,
    todayFocusMinutes,
    heatmapData,
    heatmapSummary,
    setIsRunning,
    setShowSettings,
    switchSession,
    handleReset,
    handleSkip,
    handleSettingsChange,
    handleResetAll,
  } = useStudyTimer();

  const totalDuration = getSessionDuration(sessionType, settings);
  const progress =
    totalDuration > 0
      ? ((totalDuration - secondsLeft) / totalDuration) * 100
      : 0;

  const renderSessionButton = (type: SessionType) => {
    const isSelected = sessionType === type;
    const className = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isSelected
        ? type === 'focus'
          ? 'bg-primary text-primary-foreground'
          : 'bg-success text-success-foreground'
        : 'bg-muted text-muted-foreground hover:bg-muted/80'
    }`;
    const icon =
      type === 'focus' ? (
        <BookOpen className="h-4 w-4" />
      ) : (
        <Coffee className="h-4 w-4" />
      );

    if (isSelected) {
      return (
        <button
          key={type}
          type="button"
          onClick={() => switchSession(type)}
          aria-pressed="true"
          className={className}
        >
          {icon}
          {getSessionLabel(type)}
        </button>
      );
    }

    return (
      <button
        key={type}
        type="button"
        onClick={() => switchSession(type)}
        aria-pressed="false"
        className={className}
      >
        {icon}
        {getSessionLabel(type)}
      </button>
    );
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <ToolSettings
          toolName="Study Timer"
          toolSlug={STUDY_TOOL_SLUG}
          onReset={handleResetAll}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main Timer */}
        <div className="space-y-6">
          {/* Session Type Tabs */}
          <div className="flex gap-2">
            {SESSION_TYPES.map((type) => renderSessionButton(type))}
          </div>

          {/* Timer Display */}
          <Card
            className={`overflow-hidden ${sessionType === 'focus' ? 'border-primary/20' : 'border-success/20'}`}
          >
            <CardContent className="py-12">
              <div className="flex flex-col items-center gap-8">
                {/* Progress Ring */}
                <div className="relative w-64 h-64">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
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
                      className={`transition-all duration-1000 ${sessionType === 'focus' ? 'text-primary' : 'text-success'}`}
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
                        ? 'bg-success text-success-foreground hover:bg-success/90'
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
          <TodayProgress
            todayLog={todayLog}
            todayFocusSessions={todayFocusSessions}
            todayFocusMinutes={todayFocusMinutes}
          />
          <ActivityHeatmap
            heatmapData={heatmapData}
            heatmapSummary={heatmapSummary}
          />
          <TimerSettingsPanel
            settings={settings}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </div>
  );
}
