import { describe, it, expect } from 'vitest';
import {
  sanitizeJsonLd,
  generateCourseStructuredData,
  generatePublicationStructuredData,
} from '@/shared/lib/structured-data';

describe('sanitizeJsonLd', () => {
  it('escapes HTML-sensitive characters', () => {
    const data = { text: '<script>alert("xss")</script>' };
    const result = sanitizeJsonLd(data);
    expect(result).not.toContain('<script>');
    expect(result).toContain('\\u003C');
    expect(result).toContain('\\u003E');
  });

  it('escapes ampersands', () => {
    const result = sanitizeJsonLd({ text: 'A & B' });
    expect(result).toContain('\\u0026');
  });

  it('returns valid JSON structure', () => {
    const data = { name: 'Test', nested: { value: 42 } };
    const result = sanitizeJsonLd(data);
    // After un-escaping the safe replacements, should parse back
    expect(result).toContain('"name"');
    expect(result).toContain('"Test"');
  });
});

describe('generateCourseStructuredData', () => {
  const course = {
    title: 'Algorithms',
    code: 'CSE 220',
    description: 'Study of algorithms and data structures',
    institution: 'IUB',
    level: 'Undergraduate',
    outcomes: ['Analyze algorithm complexity', 'Implement data structures'],
    technologies: ['Python', 'C++'],
  };

  it('generates valid Course schema', () => {
    const result = generateCourseStructuredData(course);
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Course');
    expect(result.name).toBe('Algorithms');
    expect(result.courseCode).toBe('CSE 220');
  });

  it('maps institution name from lookup', () => {
    const result = generateCourseStructuredData(course);
    expect(result.provider.name).toContain('Independent University');
  });

  it('falls back to raw institution string for unknown institutions', () => {
    const result = generateCourseStructuredData({
      ...course,
      institution: 'MIT',
    });
    expect(result.provider.name).toBe('MIT');
  });

  it('includes instructor and time required', () => {
    const result = generateCourseStructuredData(course);
    expect(result.instructor['@type']).toBe('Person');
    expect(result.timeRequired).toBe('P16W');
  });

  it('includes learning outcomes as teaches array', () => {
    const result = generateCourseStructuredData(course);
    expect(result.teaches).toHaveLength(2);
    expect(result.teaches).toContain('Analyze algorithm complexity');
  });
});

describe('generatePublicationStructuredData', () => {
  it('generates minimal ScholarlyArticle schema', () => {
    const result = generatePublicationStructuredData({
      title: 'A Study on XAI',
      authors: ['Author A', 'Author B'],
    });
    expect(result['@type']).toBe('ScholarlyArticle');
    expect(result.headline).toBe('A Study on XAI');
    expect(result.author).toHaveLength(2);
  });

  it('includes optional fields when provided', () => {
    const result = generatePublicationStructuredData({
      title: 'Full Paper',
      authors: ['Author A'],
      venue: 'IEEE Conference',
      year: 2024,
      abstract: 'This paper explores...',
      keywords: ['AI', 'ML'],
      doi: '10.1234/test',
      url: 'https://example.com/paper',
    });
    expect(result.publisher?.name).toBe('IEEE Conference');
    expect(result.datePublished).toBe('2024');
    expect(result.abstract).toBe('This paper explores...');
    expect(result.keywords).toEqual(['AI', 'ML']);
    expect(result.doi).toBe('10.1234/test');
    expect(result.url).toBe('https://example.com/paper');
  });

  it('omits optional fields when not provided', () => {
    const result = generatePublicationStructuredData({
      title: 'Minimal',
      authors: ['A'],
    });
    expect(result.publisher).toBeUndefined();
    expect(result.datePublished).toBeUndefined();
    expect(result.abstract).toBeUndefined();
  });
});
