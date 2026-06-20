'use client';

// ────────────────────────────────────────────────
// Grade Calculator — Course Components table card
// ────────────────────────────────────────────────

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { GradeComponent } from '@/shared/types/tools';

interface GradeComponentsTableProps {
  components: GradeComponent[];
  totalWeight: number;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof GradeComponent, value: string) => void;
}

export function GradeComponentsTable({
  components,
  totalWeight,
  onAdd,
  onRemove,
  onChange,
}: GradeComponentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Course Components</CardTitle>
            <CardDescription>
              Enter the weights and scores for your syllabus items.
            </CardDescription>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              totalWeight === 100
                ? 'bg-success/10 text-success-emphasis'
                : totalWeight > 100
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-warning/10 text-warning-emphasis'
            }`}
          >
            Total Weight: {totalWeight}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 shadow-none">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_80px_80px_80px_40px] gap-4 mb-2 px-2 text-sm font-medium text-muted-foreground">
          <div>Component Name</div>
          <div>Weight %</div>
          <div>Score</div>
          <div>Max Score</div>
          <div></div>
        </div>

        {components.map((component) => (
          <div
            key={component.id}
            className="grid sm:grid-cols-[1fr_80px_80px_80px_40px] gap-4 items-center bg-muted/30 p-4 sm:p-2 rounded-xl sm:rounded-lg border sm:border-transparent"
          >
            <div className="space-y-2 sm:space-y-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                Name
              </span>
              <Input
                value={component.name}
                onChange={(e) => onChange(component.id, 'name', e.target.value)}
                aria-label={`Component name for index ${component.id}`}
                placeholder="E.g., Midterm"
              />
            </div>
            <div className="space-y-2 sm:space-y-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                Weight (%)
              </span>
              <Input
                type="number"
                min="0"
                max="100"
                aria-label={`Weight percentage for ${component.name || component.id}`}
                value={isNaN(component.weight) ? '' : component.weight}
                onChange={(e) =>
                  onChange(component.id, 'weight', e.target.value)
                }
              />
            </div>
            <div className="space-y-2 sm:space-y-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                Score
              </span>
              <Input
                aria-label={`Score for ${component.name || component.id}`}
                type="number"
                min="0"
                value={isNaN(component.score) ? '' : component.score}
                onChange={(e) =>
                  onChange(component.id, 'score', e.target.value)
                }
              />
            </div>
            <div className="space-y-2 sm:space-y-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                Max Score
              </span>
              <Input
                type="number"
                min="0"
                aria-label={`Max score for ${component.name || component.id}`}
                value={isNaN(component.maxScore) ? '' : component.maxScore}
                onChange={(e) =>
                  onChange(component.id, 'maxScore', e.target.value)
                }
              />
            </div>
            <div className="pt-6 sm:pt-0 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => onRemove(component.id)}
                disabled={components.length <= 1}
                aria-label={`Remove component ${component.name || component.id}`}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove Component</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onAdd}
          variant="outline"
          className="w-full border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Component
        </Button>
      </CardFooter>
    </Card>
  );
}
