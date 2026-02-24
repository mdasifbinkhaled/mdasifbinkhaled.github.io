// ────────────────────────────────────────────────
// Seat Planner — Exam Details form card
// ────────────────────────────────────────────────

import { useId } from 'react';
import { FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import type { ExamDetails } from './types';

interface ExamDetailsFormProps {
  field: (key: keyof ExamDetails) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export function ExamDetailsForm({ field }: ExamDetailsFormProps) {
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
