'use client';

import { Plus, RotateCcw, ChevronDown, Download, FileUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ToolSettings } from '@/shared/components/common/tool-settings';
import { DataImporter } from '@/shared/components/common/data-importer';
import type { SchemaField, ImportCommitMeta } from '@/shared/lib/parsers/types';
import { PRESETS } from './presets';
import { COURSE_TOOL_SLUG, type CoursePlanKey } from './use-course-planner';

const COURSE_FIELDS: readonly SchemaField<CoursePlanKey>[] = [
  {
    key: 'code',
    label: 'Course code',
    required: true,
    aliases: ['code', 'course', 'course code'],
  },
  {
    key: 'title',
    label: 'Title',
    required: false,
    aliases: ['title', 'name', 'course title', 'course name'],
  },
  {
    key: 'credits',
    label: 'Credits',
    required: true,
    aliases: ['credits', 'credit', 'cr'],
    parse: (raw) => {
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0 || n > 6) {
        throw new Error(`invalid credits "${raw}"`);
      }
      return Math.floor(n);
    },
  },
  {
    key: 'prerequisites',
    label: 'Prerequisites',
    required: false,
    aliases: ['prerequisites', 'prereqs', 'prereq', 'requires'],
  },
];

interface CoursePlannerActionsProps {
  hasCourses: boolean;
  importOpen: boolean;
  onToggleAdd: () => void;
  onResetProgress: () => void;
  onExportJSON: () => void;
  onOpenImport: () => void;
  onImportOpenChange: (open: boolean) => void;
  onLoadPreset: (name: string) => void;
  onImportCourses: (
    rows: Record<CoursePlanKey, unknown>[],
    meta: ImportCommitMeta
  ) => void;
  onResetAll: () => void;
}

export function CoursePlannerActions({
  hasCourses,
  importOpen,
  onToggleAdd,
  onResetProgress,
  onExportJSON,
  onOpenImport,
  onImportOpenChange,
  onLoadPreset,
  onImportCourses,
  onResetAll,
}: CoursePlannerActionsProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Load Preset
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {PRESETS.map((p) => (
              <DropdownMenuItem
                key={p.name}
                onClick={() => onLoadPreset(p.name)}
              >
                {p.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm" onClick={onToggleAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add Course
        </Button>
        <Button variant="ghost" size="sm" onClick={onResetProgress}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset Progress
        </Button>
        {hasCourses && (
          <Button variant="outline" size="sm" onClick={onExportJSON}>
            <Download className="h-4 w-4 mr-1" />
            Export JSON
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onOpenImport}>
          <FileUp className="h-4 w-4 mr-1" />
          Import
        </Button>
        <ToolSettings
          toolName="Course Planner"
          toolSlug={COURSE_TOOL_SLUG}
          onReset={onResetAll}
        />
      </div>
      <DataImporter<CoursePlanKey>
        open={importOpen}
        onOpenChange={onImportOpenChange}
        defaultTab="upload"
        fields={COURSE_FIELDS}
        title="Import courses"
        description="Paste or upload a CSV/XLSX. Prerequisites may be a comma- or semicolon-separated list of course codes."
        pastePlaceholder={
          'Code\tTitle\tCredits\tPrerequisites\nCSE 203\tData Structures\t4\tCSE 200'
        }
        onCommit={onImportCourses}
      />
    </>
  );
}
