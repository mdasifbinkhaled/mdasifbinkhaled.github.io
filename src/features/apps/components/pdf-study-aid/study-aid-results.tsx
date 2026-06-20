'use client';

import { Copy, HelpCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import type { StudyAidSnapshot } from './study-aid';

interface StudyAidResultsProps {
  snapshot: StudyAidSnapshot;
  markdown: string;
  onCopy: () => void;
}

export function StudyAidResults({
  snapshot,
  markdown,
  onCopy,
}: StudyAidResultsProps) {
  return (
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
                <Badge key={term.term} variant="outline" className="px-3 py-1">
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
            <Button variant="outline" size="sm" onClick={onCopy}>
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
  );
}
