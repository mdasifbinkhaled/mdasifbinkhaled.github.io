// ────────────────────────────────────────────────
// Seat Planner — Exam Details form card
// ────────────────────────────────────────────────

import { useId, useMemo, useState } from 'react';
import { CopyPlus, Eraser, FileText, Sparkles, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import type { ExamDetails, SectionFacultyMap } from './types';

interface ExamDetailsFormProps {
  field: (key: keyof ExamDetails) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  sections: number[];
  sectionCounts: Record<number, number>;
  sectionFaculty: SectionFacultyMap;
  onSectionFacultyChange: (section: number, value: string) => void;
  onSectionFacultyReplace: (value: SectionFacultyMap) => void;
}

export function ExamDetailsForm({
  field,
  sections,
  sectionCounts,
  sectionFaculty,
  onSectionFacultyChange,
  onSectionFacultyReplace,
}: ExamDetailsFormProps) {
  const [sharedFacultyName, setSharedFacultyName] = useState('');
  const [bulkFacultyValue, setBulkFacultyValue] = useState('');
  const activeSectionSet = useMemo(() => new Set(sections), [sections]);
  const namedSectionsCount = useMemo(
    () => sections.filter((section) => sectionFaculty[section]?.trim()).length,
    [sectionFaculty, sections]
  );

  const applySharedFacultyName = () => {
    const trimmedValue = sharedFacultyName.trim();
    if (!trimmedValue || sections.length === 0) return;

    onSectionFacultyReplace(
      Object.fromEntries(sections.map((section) => [section, trimmedValue]))
    );
  };

  const applyBulkFacultyAssignments = () => {
    const parsedAssignments = parseBulkFacultyAssignments(
      bulkFacultyValue,
      activeSectionSet
    );
    if (Object.keys(parsedAssignments).length === 0) return;

    onSectionFacultyReplace({
      ...sectionFaculty,
      ...parsedAssignments,
    });
  };

  return (
    <Card className="border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md print:hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          Exam Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldRow
            label="Course Code(s)"
            placeholder="e.g. CSE 211/CSC 306"
            {...field('courseCodes')}
          />
          <FieldRow
            label="Course Title"
            placeholder="e.g. Algorithms"
            {...field('courseTitle')}
          />
          <FieldRow
            label="Exam Type"
            placeholder="e.g. Final Examination"
            {...field('examType')}
          />
          <div className="grid grid-cols-2 gap-2">
            <FieldRow
              label="Semester"
              placeholder="e.g. Autumn"
              {...field('semester')}
            />
            <FieldRow label="Year" placeholder="e.g. 2025" {...field('year')} />
          </div>
          <FieldRow
            label="Department"
            placeholder="e.g. Department of CSE"
            {...field('department')}
          />
          <FieldRow
            label="University"
            placeholder="e.g. Independent University, Bangladesh"
            {...field('university')}
          />
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4 text-muted-foreground" />
                Section Faculty / Invigilator
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Optional. These names are included in room sheets and PDF
                exports when space permits.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sections.length > 0 ? (
                <Badge variant="outline" className="rounded-full px-2.5 py-1">
                  {sections.length} active section
                  {sections.length === 1 ? '' : 's'}
                </Badge>
              ) : null}
              <Badge
                variant="outline"
                className={cn(
                  'rounded-full px-2.5 py-1',
                  sections.length > 0 && namedSectionsCount === sections.length
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300'
                )}
              >
                {sections.length > 0
                  ? `${namedSectionsCount}/${sections.length} named`
                  : 'Waiting for sections'}
              </Badge>
            </div>
          </div>

          {sections.length > 0 ? (
            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.95fr)]">
              <div className="grid gap-3 md:grid-cols-2">
                {sections.map((section) => (
                  <div
                    key={section}
                    className="rounded-2xl border bg-muted/15 p-3 transition-colors hover:bg-muted/25"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">Section {section}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {sectionCounts[section] ?? 0} student
                          {(sectionCounts[section] ?? 0) === 1 ? '' : 's'}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-medium',
                          sectionFaculty[section]?.trim()
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {sectionFaculty[section]?.trim() ? 'Named' : 'Pending'}
                      </span>
                    </div>
                    <Input
                      value={sectionFaculty[section] ?? ''}
                      onChange={(e) =>
                        onSectionFacultyChange(section, e.target.value)
                      }
                      placeholder="Faculty / invigilator name"
                      aria-label={`Faculty name for section ${section}`}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border bg-muted/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-primary/10 p-2 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Bulk update names</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Apply one name to all active sections or paste a section
                      to faculty list such as `1\tDr. Nusrat Karim` or `Section
                      2: Md. Imran Hossain`.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Apply one name to all active sections
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Input
                      value={sharedFacultyName}
                      onChange={(e) => setSharedFacultyName(e.target.value)}
                      placeholder="e.g. Dr. Nusrat Karim"
                      className="min-w-[12rem] flex-1"
                      aria-label="Apply one faculty name to all active sections"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={applySharedFacultyName}
                      disabled={!sharedFacultyName.trim()}
                    >
                      <CopyPlus className="h-4 w-4" />
                      Apply to all
                    </Button>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Paste section mappings
                  </label>
                  <textarea
                    value={bulkFacultyValue}
                    onChange={(e) => setBulkFacultyValue(e.target.value)}
                    placeholder={
                      '1\tDr. Nusrat Karim\n2\tMd. Imran Hossain\nSection 3: Prof. Tania Rahman'
                    }
                    className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Paste section mappings"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={applyBulkFacultyAssignments}
                      disabled={!bulkFacultyValue.trim()}
                    >
                      <Sparkles className="h-4 w-4" />
                      Apply faculty list
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => onSectionFacultyReplace({})}
                      disabled={namedSectionsCount === 0}
                    >
                      <Eraser className="h-4 w-4" />
                      Clear all names
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed px-3 py-3 text-xs text-muted-foreground">
              Import students first to add section-specific faculty names.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ── FieldRow with proper label association ──────

function FieldRow({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function parseBulkFacultyAssignments(
  value: string,
  activeSections: ReadonlySet<number>
): SectionFacultyMap {
  return value.split(/\r?\n/).reduce<SectionFacultyMap>((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed) return acc;

    const directMatch =
      trimmed.match(/^(?:section|sec)?\s*(\d+)\s*[:\-–]\s*(.+)$/i) ??
      trimmed.match(/^(\d+)\s+[\t ]*(.+)$/);
    const delimitedMatch = trimmed.match(/^(.+?)\s*[,;|\t]\s*(.+)$/);

    const rawSection = directMatch?.[1] ?? delimitedMatch?.[1] ?? '';
    const section = Number(
      rawSection.replace(/^(?:section|sec)\s*/i, '').trim()
    );
    const name = (directMatch?.[2] ?? delimitedMatch?.[2] ?? '').trim();

    if (!Number.isFinite(section) || !name || !activeSections.has(section)) {
      return acc;
    }

    acc[section] = name;
    return acc;
  }, {});
}
