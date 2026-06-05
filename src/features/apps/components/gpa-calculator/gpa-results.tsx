'use client';

// ────────────────────────────────────────────────
// GPA Calculator — Results overview card
// ────────────────────────────────────────────────

import { Calculator, Copy } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

interface GpaResultsProps {
  termGpa: number;
  termCredits: number;
  cgpa: number;
  totalCredits: number;
  prevCredits: number | '';
  prevCgpa: number | '';
  onCopyResult: () => void;
}

export function GpaResults({
  termGpa,
  termCredits,
  cgpa,
  totalCredits,
  prevCredits,
  prevCgpa,
  onCopyResult,
}: GpaResultsProps) {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Results Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Term GPA
          </div>
          <div className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
            {termGpa.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground mt-1 text-balance">
            Based on {termCredits} new credits this semester.
          </div>
        </div>

        {typeof prevCredits === 'number' && typeof prevCgpa === 'number' && (
          <>
            <div className="h-px w-full bg-border" />
            <div className="space-y-1">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                Projected CGPA
              </div>
              <div className="text-3xl font-extrabold tabular-nums tracking-tight text-primary">
                {cgpa.toFixed(2)}
              </div>
              <div className="text-sm text-primary/80 mt-1">
                Based on {totalCredits} total accumulated credits.
              </div>
            </div>
          </>
        )}

        <Button
          className="w-full mt-4"
          onClick={onCopyResult}
          variant="secondary"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Results
        </Button>
      </CardContent>
    </Card>
  );
}
