'use client';

// ────────────────────────────────────────────────
// Study Timer — collapsible settings panel
// ────────────────────────────────────────────────

import { Settings2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import type { TimerSettings } from './study-timer.utils';

interface TimerSettingsPanelProps {
  settings: TimerSettings;
  showSettings: boolean;
  setShowSettings: (open: boolean) => void;
  handleSettingsChange: (field: keyof TimerSettings, value: string) => void;
}

export function TimerSettingsPanel({
  settings,
  showSettings,
  setShowSettings,
  handleSettingsChange,
}: TimerSettingsPanelProps) {
  const settingsToggle = showSettings ? (
    <button
      type="button"
      onClick={() => setShowSettings(false)}
      aria-expanded="true"
      className="flex items-center justify-between w-full"
    >
      <CardTitle className="text-lg flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-muted-foreground" />
        Settings
      </CardTitle>
      <span className="text-xs text-muted-foreground">Hide</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setShowSettings(true)}
      aria-expanded="false"
      className="flex items-center justify-between w-full"
    >
      <CardTitle className="text-lg flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-muted-foreground" />
        Settings
      </CardTitle>
      <span className="text-xs text-muted-foreground">Show</span>
    </button>
  );

  return (
    <Card>
      <CardHeader className="pb-2">{settingsToggle}</CardHeader>
      {showSettings && (
        <CardContent className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              <span className="block mb-1.5">Focus Duration (min)</span>
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
            </label>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              <span className="block mb-1.5">Short Break (min)</span>
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
            </label>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              <span className="block mb-1.5">Long Break (min)</span>
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
            </label>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              <span className="block mb-1.5">Sessions Before Long Break</span>
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
            </label>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
