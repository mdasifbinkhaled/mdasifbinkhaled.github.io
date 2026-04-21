'use client';

import { useMemo, useRef, useState } from 'react';
import { BookOpen, FileUp, Sparkles, Copy, HelpCircle } from 'lucide-react';
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
              >
                <FileUp className="mr-2 h-4 w-4" />
                {isProcessing ? 'Processing PDF…' : 'Upload PDF'}
              </Button>
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
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {snapshot.summary.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="leading-relaxed text-muted-foreground">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Section Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {snapshot.sections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                      <ul className="space-y-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-sm leading-relaxed text-muted-foreground"
                          >
                            - {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Key Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {snapshot.keyTerms.map((term) => (
                      <Badge
                        key={term.term}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        {term.term}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {term.mentions}
                        </span>
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Practice Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {snapshot.practiceQuestions.map((question) => (
                      <div
                        key={question.prompt}
                        className="rounded-lg border bg-muted/20 p-3"
                      >
                        <p className="font-medium leading-relaxed">
                          {question.prompt}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Hint: {question.answerHint}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="print:hidden">
              <CardHeader>
                <CardTitle className="text-lg">Copy-ready Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleCopy()}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Markdown
                  </Button>
                </div>
                <pre className="max-h-80 overflow-auto rounded-lg border bg-muted/20 p-4 text-xs leading-6 text-muted-foreground">
                  {markdown}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <aside className="hidden lg:block print:hidden">
        <StatsPanel items={stats} title="Study Aid" />
      </aside>
    </div>
  );
}
