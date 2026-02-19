import { describe, it, expect } from 'vitest';
import {
  formatBreadcrumbTitle,
  getCourseLinkIcon,
} from '@/shared/lib/course-utils';

describe('formatBreadcrumbTitle', () => {
  it('converts institution codes to uppercase', () => {
    expect(formatBreadcrumbTitle('iub')).toBe('IUB');
    expect(formatBreadcrumbTitle('bracu')).toBe('BRACU');
    expect(formatBreadcrumbTitle('nsu')).toBe('NSU');
    expect(formatBreadcrumbTitle('aiub')).toBe('AIUB');
  });

  it('handles case-insensitive institution codes', () => {
    expect(formatBreadcrumbTitle('IUB')).toBe('IUB');
    expect(formatBreadcrumbTitle('Bracu')).toBe('BRACU');
  });

  it('formats simple course codes (letters + numbers)', () => {
    expect(formatBreadcrumbTitle('cse211')).toBe('CSE 211');
    expect(formatBreadcrumbTitle('CSE420')).toBe('CSE 420');
    expect(formatBreadcrumbTitle('mat101')).toBe('MAT 101');
  });

  it('formats complex course codes with semester info', () => {
    expect(formatBreadcrumbTitle('cse211spr26')).toBe('CSE 211 Spring 2026');
    expect(formatBreadcrumbTitle('cse420sum25')).toBe('CSE 420 Summer 2025');
    expect(formatBreadcrumbTitle('mat101aut24')).toBe('MAT 101 Autumn 2024');
    expect(formatBreadcrumbTitle('cse331win23')).toBe('CSE 331 Winter 2023');
    expect(formatBreadcrumbTitle('cse489fal25')).toBe('CSE 489 Fall 2025');
  });

  it('converts hyphenated segments to title case', () => {
    expect(formatBreadcrumbTitle('my-course')).toBe('My Course');
    expect(formatBreadcrumbTitle('data-structures')).toBe('Data Structures');
  });

  it('converts plain words to title case', () => {
    expect(formatBreadcrumbTitle('teaching')).toBe('Teaching');
    expect(formatBreadcrumbTitle('about')).toBe('About');
  });
});

describe('getCourseLinkIcon', () => {
  it('returns a function (component) for each link type', () => {
    const types = [
      'outline',
      'slides',
      'video',
      'discord',
      'site',
      'problem-set',
      'note',
      'other',
    ] as const;

    for (const type of types) {
      const icon = getCourseLinkIcon(type);
      expect(typeof icon).toBe('function');
    }
  });

  it('returns distinct icons for different types', () => {
    const outline = getCourseLinkIcon('outline');
    const slides = getCourseLinkIcon('slides');
    const video = getCourseLinkIcon('video');
    expect(outline).not.toBe(slides);
    expect(slides).not.toBe(video);
  });
});
