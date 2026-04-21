import { errMsg, ok, type Result } from '@/shared/lib/validation';

export interface StudyAidSection {
  title: string;
  bullets: string[];
}

export interface StudyAidQuestion {
  prompt: string;
  answerHint: string;
}

export interface StudyAidSnapshot {
  fileName: string;
  pageCount: number;
  wordCount: number;
  estimatedReadMinutes: number;
  generatedAt: string;
  summary: string[];
  sections: StudyAidSection[];
  keyTerms: Array<{ term: string; mentions: number }>;
  practiceQuestions: StudyAidQuestion[];
}

const STOPWORDS = new Set([
  'about',
  'after',
  'again',
  'also',
  'among',
  'and',
  'because',
  'been',
  'before',
  'being',
  'between',
  'both',
  'could',
  'does',
  'each',
  'from',
  'have',
  'into',
  'more',
  'most',
  'must',
  'only',
  'other',
  'over',
  'same',
  'should',
  'such',
  'than',
  'that',
  'their',
  'them',
  'there',
  'these',
  'they',
  'this',
  'those',
  'through',
  'using',
  'very',
  'what',
  'when',
  'where',
  'which',
  'while',
  'with',
  'would',
  'your',
]);

function normaliseWhitespace(text: string): string {
  return text
    .replace(/\r/g, '\n')
    .replace(/\u0000/g, ' ')
    .replace(/[\t\f\v ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ ]+\n/g, '\n')
    .trim();
}

function splitSentences(text: string): string[] {
  const matches = text.match(/[^.!?\n]+[.!?]?/g) ?? [];
  return matches
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 40);
}

function isHeadingLine(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 4 || trimmed.length > 80) return false;
  if (/[.!?]$/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  if (words.length > 10) return false;

  return (
    /^\d+(?:\.\d+)*\s+/.test(trimmed) ||
    /:$/.test(trimmed) ||
    (/^[A-Z][A-Z0-9\s\-()/]+$/.test(trimmed) && words.length <= 8) ||
    (/^[A-Z][a-z0-9]+(?:\s+[A-Z][a-z0-9]+){1,6}$/.test(trimmed) &&
      !trimmed.includes(','))
  );
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bMl\b/g, 'ML');
}

function toSections(text: string): Array<{ title: string; body: string }> {
  const lines = normaliseWhitespace(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: Array<{ title: string; lines: string[] }> = [];
  let current = { title: 'Overview', lines: [] as string[] };

  for (const line of lines) {
    if (isHeadingLine(line) && current.lines.length > 0) {
      sections.push(current);
      current = {
        title: titleCase(
          line.replace(/^\d+(?:\.\d+)*\s+/, '').replace(/:$/, '')
        ),
        lines: [],
      };
      continue;
    }
    current.lines.push(line);
  }

  if (current.lines.length > 0) sections.push(current);

  const compact = sections
    .map((section) => ({
      title: section.title,
      body: section.lines.join(' ').replace(/\s+/g, ' ').trim(),
    }))
    .filter((section) => section.body.length >= 60);

  if (compact.length > 0) return compact.slice(0, 6);

  const paragraphs = text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter((paragraph) => paragraph.length >= 60)
    .slice(0, 6);

  return paragraphs.map((body, index) => ({
    title: `Section ${index + 1}`,
    body,
  }));
}

function topBullets(body: string, limit: number): string[] {
  return splitSentences(body)
    .slice(0, limit)
    .map((sentence) => sentence.replace(/\s+/g, ' ').trim());
}

function extractKeyTerms(text: string) {
  const frequencies = new Map<string, number>();
  for (const token of text.toLowerCase().match(/[a-z][a-z-]{3,}/g) ?? []) {
    if (STOPWORDS.has(token)) continue;
    frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
  }

  return Array.from(frequencies.entries())
    .sort(
      (left, right) => right[1] - left[1] || left[0].localeCompare(right[0])
    )
    .slice(0, 8)
    .map(([term, mentions]) => ({
      term: titleCase(term),
      mentions,
    }));
}

export function buildStudyAidFromText(
  rawText: string,
  fileName: string,
  pageCount: number
): Result<StudyAidSnapshot> {
  const text = normaliseWhitespace(rawText);
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount < 40) {
    return errMsg(
      'pdf-too-short',
      'This PDF does not contain enough extractable text to build study notes.'
    );
  }

  const sections = toSections(text).map((section) => ({
    title: section.title,
    bullets: topBullets(section.body, 3),
  }));

  const summary = sections
    .flatMap((section) => section.bullets.slice(0, 1))
    .slice(0, 5);

  const keyTerms = extractKeyTerms(text);

  const practiceQuestions = sections.slice(0, 5).map((section, index) => ({
    prompt:
      section.title === 'Overview'
        ? `What is the core idea of the document section ${index + 1}?`
        : `How would you explain ${section.title.toLowerCase()} from this PDF?`,
    answerHint: section.bullets[0] ?? 'Review the relevant section summary.',
  }));

  return ok({
    fileName,
    pageCount,
    wordCount,
    estimatedReadMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    generatedAt: new Date().toISOString(),
    summary,
    sections,
    keyTerms,
    practiceQuestions,
  });
}

export async function extractTextFromPdf(
  file: File
): Promise<Result<{ text: string; pageCount: number }>> {
  try {
    const pdfjs = await import('pdfjs-dist/webpack.mjs');
    const data = new Uint8Array(await file.arrayBuffer());
    const loadingTask = pdfjs.getDocument({ data });
    const pdf = await loadingTask.promise;
    const pages: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = (await page.getTextContent()) as {
        items: Array<{ str?: string; hasEOL?: boolean }>;
      };
      const pageText = content.items
        .map((item) => {
          if (typeof item.str === 'string') {
            return item.hasEOL ? `${item.str}\n` : item.str;
          }
          return '';
        })
        .join(' ')
        .replace(/\s+\n/g, '\n')
        .trim();

      if (pageText) pages.push(pageText);
      page.cleanup();
    }

    const text = normaliseWhitespace(pages.join('\n\n'));
    if (!text) {
      return errMsg('pdf-empty', 'No extractable text was found in this PDF.');
    }

    return ok({ text, pageCount: pdf.numPages });
  } catch {
    return errMsg(
      'pdf-read-failed',
      'Unable to read this PDF in the browser. Try a text-based PDF instead of a scanned image.'
    );
  }
}

export function formatStudyAidAsMarkdown(snapshot: StudyAidSnapshot): string {
  const sections = snapshot.sections
    .map(
      (section) =>
        `## ${section.title}\n${section.bullets.map((bullet) => `- ${bullet}`).join('\n')}`
    )
    .join('\n\n');

  const glossary = snapshot.keyTerms
    .map((item) => `- ${item.term} (${item.mentions})`)
    .join('\n');

  const questions = snapshot.practiceQuestions
    .map(
      (question, index) =>
        `${index + 1}. ${question.prompt}\n   Hint: ${question.answerHint}`
    )
    .join('\n');

  return [
    `# Study Aid — ${snapshot.fileName}`,
    '',
    '## Summary',
    ...snapshot.summary.map((bullet) => `- ${bullet}`),
    '',
    sections,
    '',
    '## Key Terms',
    glossary,
    '',
    '## Practice Questions',
    questions,
  ].join('\n');
}
