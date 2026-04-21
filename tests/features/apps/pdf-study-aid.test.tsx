import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PdfStudyAid } from '@/features/apps/components/pdf-study-aid/pdf-study-aid';
import {
  buildStudyAidFromText,
  formatStudyAidAsMarkdown,
} from '@/features/apps/components/pdf-study-aid/study-aid';

const SAMPLE_TEXT = `
Introduction
Explainable artificial intelligence helps students and clinicians understand why a model produced a specific recommendation. This document outlines the motivation for transparent systems in healthcare.

Methods
The study compares interpretable models with black-box baselines across several datasets. It highlights how model confidence, feature attribution, and documentation improve trust.

Results
Transparent models improved communication with stakeholders and reduced ambiguity during review meetings. The document also emphasizes practical deployment constraints and validation needs.
`;

describe('PdfStudyAid', () => {
  it('renders the upload prompt and local-processing note', () => {
    render(<PdfStudyAid />);
    expect(screen.getByText('Local PDF Study Aid')).toBeInTheDocument();
    expect(
      screen.getByText('No upload leaves the browser')
    ).toBeInTheDocument();
  });
});

describe('study aid helpers', () => {
  it('builds a structured study aid from extracted text', () => {
    const result = buildStudyAidFromText(SAMPLE_TEXT, 'sample.pdf', 3);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.summary.length).toBeGreaterThan(0);
    expect(result.data.sections.length).toBeGreaterThan(0);
    expect(result.data.keyTerms.length).toBeGreaterThan(0);
    expect(result.data.practiceQuestions.length).toBeGreaterThan(0);
  });

  it('returns an error for text that is too short', () => {
    const result = buildStudyAidFromText(
      'Too short for a real study guide.',
      'tiny.pdf',
      1
    );
    expect(result.ok).toBe(false);
  });

  it('formats the generated study aid as markdown', () => {
    const result = buildStudyAidFromText(SAMPLE_TEXT, 'sample.pdf', 3);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const markdown = formatStudyAidAsMarkdown(result.data);
    expect(markdown).toContain('# Study Aid — sample.pdf');
    expect(markdown).toContain('## Summary');
    expect(markdown).toContain('## Practice Questions');
  });
});
