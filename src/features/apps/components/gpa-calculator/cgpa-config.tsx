'use client';

// ────────────────────────────────────────────────
// GPA Calculator — Cumulative GPA configuration card
// ────────────────────────────────────────────────

import { Settings2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';

interface CgpaConfigProps {
  prevCredits: number | '';
  prevCgpa: number | '';
  onPrevCreditsChange: (value: number | '') => void;
  onPrevCgpaChange: (value: number | '') => void;
}

export function CgpaConfig({
  prevCredits,
  prevCgpa,
  onPrevCreditsChange,
  onPrevCgpaChange,
}: CgpaConfigProps) {
  return (
    <Card className="shadow-xs">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-muted-foreground" />
          Cumulative GPA (CGPA) Configuration
        </CardTitle>
        <CardDescription>
          Optionally enter your previous academic standing to calculate combined
          outcome.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Previous Total Credits
            </label>
            <Input
              type="number"
              placeholder="e.g. 104"
              min="0"
              value={prevCredits}
              onChange={(e) =>
                onPrevCreditsChange(
                  e.target.value ? parseFloat(e.target.value) : ''
                )
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Previous CGPA
            </label>
            <Input
              type="number"
              placeholder="e.g. 3.45"
              min="0"
              max="4.0"
              step="0.01"
              value={prevCgpa}
              onChange={(e) => {
                if (!e.target.value) {
                  onPrevCgpaChange('');
                } else {
                  const v = parseFloat(e.target.value);
                  onPrevCgpaChange(Math.min(4.0, Math.max(0, v)));
                }
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
