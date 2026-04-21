// ────────────────────────────────────────────────
// Seat Planner — Exam Details form card
// ────────────────────────────────────────────────

import { useId } from 'react';
import { FileText, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
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
}

export function ExamDetailsForm({
  field,
  sections,
  sectionCounts,
  sectionFaculty,
  onSectionFacultyChange,
}: ExamDetailsFormProps) {
  return (
    <Card className="print:hidden">
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
            {sections.length > 0 ? (
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {sections.length} active section
                {sections.length === 1 ? '' : 's'}
              </span>
            ) : null}
          </div>

          {sections.length > 0 ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {sections.map((section) => (
                <div
                  key={section}
                  className="rounded-xl border bg-muted/15 p-3"
                >
                  <div className="mb-2">
                    <p className="text-sm font-medium">Section {section}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {sectionCounts[section] ?? 0} student
                      {(sectionCounts[section] ?? 0) === 1 ? '' : 's'}
                    </p>
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
