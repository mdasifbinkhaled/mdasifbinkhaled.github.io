'use client';

import { useMemo, useRef, useState } from 'react';
import { BookOpen, FileUp, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { useToolStorage } from '@/shared/lib/storage';
import { downloadFile } from '@/shared/lib/download-file';
import { ExportBar } from '@/shared/components/common/export-bar';
import {
  StatsPanel,
  type StatItem,
} from '@/shared/components/common/stats-panel';
import { ToolSettings } from '@/shared/components/common/tool-settings';
import {
  buildStudyAidFromText,
  extractTextFromPdf,
  formatStudyAidAsMarkdown,
  type StudyAidSnapshot,
} from './study-aid';
import { StudyAidResults } from './study-aid-results';

const TOOL_SLUG = 'pdf-study-aid';

export function PdfStudyAid() {
  const [snapshot, setSnapshot] = useToolStorage<StudyAidSnapshot | null>(
    TOOL_SLUG,
    'snapshot',
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const markdown = useMemo(
    () => (snapshot ? formatStudyAidAsMarkdown(snapshot) : ''),
    [snapshot]
  );

  const stats = useMemo<StatItem[]>(() => {
    if (!snapshot) return [];
    return [
      {
        label: 'Pages',
        value: snapshot.pageCount.toLocaleString(),
      },
      {
        label: 'Words',
        value: snapshot.wordCount.toLocaleString(),
        hint: `${snapshot.estimatedReadMinutes} min read`,
      },
      {
        label: 'Sections',
        value: snapshot.sections.length.toLocaleString(),
      },
      {
        label: 'Questions',
        value: snapshot.practiceQuestions.length.toLocaleString(),
      },
    ];
  }, [snapshot]);

  const handleCopy = async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success('Study notes copied');
    } catch {
      toast.error('Unable to copy study notes');
    }
  };

  const handleJsonExport = () => {
    if (!snapshot) return;
    downloadFile(
      JSON.stringify(snapshot, null, 2),
      `${snapshot.fileName.replace(/\.pdf$/i, '')}-study-aid.json`,
      'application/json'
    );
    toast.success('Study aid exported');
  };

  const handleUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const extracted = await extractTextFromPdf(file);
      if (!extracted.ok) {
        toast.error(extracted.errors[0]?.message ?? 'PDF extraction failed');
        return;
      }

      const built = buildStudyAidFromText(
        extracted.data.text,
        file.name,
        extracted.data.pageCount
      );
      if (!built.ok) {
        toast.error(built.errors[0]?.message ?? 'Study aid generation failed');
        return;
      }

      setSnapshot(built.data);
      toast.success(`Generated study aid for ${file.name}`);
    } finally {
      setIsProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const exportHandlers = snapshot
    ? {
        copy: () => void handleCopy(),
        json: handleJsonExport,
        print: () => window.print(),
      }
    : {};

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="space-y-6">
        <div className="lg:hidden">
          <StatsPanel
            items={stats}
            orientation="horizontal"
            title="Study Aid"
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 print:hidden">
          <ExportBar handlers={exportHandlers} disabled={!snapshot} />
          <ToolSettings
            toolName="PDF Study Aid"
            toolSlug={TOOL_SLUG}
            onReset={() => setSnapshot(null)}
          />
        </div>

        <Card className="border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
              Local PDF Study Aid
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Upload a text-based PDF and generate study notes, section
              summaries, glossary terms, and practice questions without sending
              the file to a server.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={isProcessing}
                aria-busy={isProcessing}
              >
                <FileUp className="mr-2 h-4 w-4" />
                {isProcessing ? 'Processing PDF…' : 'Upload PDF'}
              </Button>
              <span className="sr-only" role="status" aria-live="polite">
                {isProcessing ? 'Processing PDF, please wait.' : ''}
              </span>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                aria-label="Upload PDF file"
                title="Upload PDF file"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleUpload(file);
                }}
              />
              <Badge variant="outline">No upload leaves the browser</Badge>
              <Badge variant="secondary">Best with selectable text PDFs</Badge>
            </div>
          </CardContent>
        </Card>

        {!snapshot ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-14 text-center text-muted-foreground">
              <Sparkles className="h-8 w-8 text-primary/70" />
              <p className="max-w-xl">
                After upload, the tool will extract text, condense key ideas,
                surface frequent terms, and generate revision questions.
              </p>
            </CardContent>
          </Card>
        ) : (
          <StudyAidResults
            snapshot={snapshot}
            markdown={markdown}
            onCopy={() => void handleCopy()}
          />
        )}
      </div>

      <aside className="hidden lg:block print:hidden">
        <StatsPanel items={stats} title="Study Aid" />
      </aside>
    </div>
  );
}
