// ────────────────────────────────────────────────
// Seat Planner — Student Data input card
// ────────────────────────────────────────────────

import { Upload, Trash2, AlertCircle, Users, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Th } from './shared-ui';
import type { Student } from './types';

interface StudentDataPanelProps {
  students: Student[];
  sections: number[];
  parseErrors: string[];
  rawInput: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onParseInput: (text: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveStudent: (id: string) => void;
}

export function StudentDataPanel({
  students,
  sections,
  parseErrors,
  rawInput,
  fileInputRef,
  onParseInput,
  onFileUpload,
  onRemoveStudent,
}: StudentDataPanelProps) {
  return (
    <Card className="print:hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          Student Data
          {students.length > 0 && (
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {students.length} students · {sections.length} section
              {sections.length !== 1 ? 's' : ''}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* upload / instructions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={onFileUpload}
            aria-label="Upload student data CSV"
          />
          <span className="text-xs text-muted-foreground self-center">
            or paste tab / comma‑separated data below (ID, Name, Section)
          </span>
        </div>

        {/* paste area */}
        <textarea
          className="w-full h-32 p-3 text-sm font-mono border rounded-md bg-muted/30 focus:outline-hidden focus:ring-2 focus:ring-primary/50 resize-y"
          placeholder={`Student ID\tStudent Name\tSection\n2312209\tShah Newaz Shawrob\t6\n2131244\tFaiyaz Rahim\t1`}
          value={rawInput}
          onChange={(e) => onParseInput(e.target.value)}
          aria-label="Paste student data"
        />

        {/* parse errors */}
        {parseErrors.length > 0 && (
          <div
            className="bg-destructive/10 border border-destructive/30 rounded-md p-3"
            role="alert"
          >
            <p className="flex items-center gap-2 text-sm font-medium text-destructive mb-1">
              <AlertCircle className="h-4 w-4" />
              {parseErrors.length} warning
              {parseErrors.length !== 1 ? 's' : ''}
            </p>
            <ul className="text-xs text-destructive/80 space-y-0.5 max-h-24 overflow-y-auto">
              {parseErrors.map((e, i) => (
                <li key={i}>• {e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* parsed student table */}
        {students.length > 0 && (
          <div className="border rounded-md overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <Th className="w-12">SL</Th>
                    <Th>Student ID</Th>
                    <Th>Name</Th>
                    <Th className="w-16 text-center">Sec</Th>
                    <Th className="w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((s, i) => (
                    <tr key={s.id} className="hover:bg-muted/30">
                      <td className="px-3 py-1.5 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="px-3 py-1.5 font-mono text-xs">{s.id}</td>
                      <td className="px-3 py-1.5">{s.name}</td>
                      <td className="px-3 py-1.5 text-center">{s.section}</td>
                      <td className="px-3 py-1.5 text-center">
                        <button
                          onClick={() => onRemoveStudent(s.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove student ${s.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* success pill */}
        {students.length > 0 && parseErrors.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            {students.length} students parsed successfully
          </p>
        )}
      </CardContent>
    </Card>
  );
}
