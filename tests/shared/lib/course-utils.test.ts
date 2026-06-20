import { describe, it, expect } from 'vitest';
import {
  formatBreadcrumbTitle,
  getCourseLinkIcon,
  getCourseSlug,
  getCoursePath,
} from '@/shared/lib/course-utils';

describe('getCourseSlug / getCoursePath (single source of truth)', () => {
  it('prefers the slug, lowercased and space-stripped', () => {
    expect(getCourseSlug({ slug: 'CSE211Sum26', code: 'CSE 211' })).toBe(
      'cse211sum26'
    );
  });

  it('falls back to the normalized code when slug is absent or blank', () => {
    expect(getCourseSlug({ code: 'CSE 211' })).toBe('cse211');
    expect(getCourseSlug({ slug: '   ', code: 'MAT 120' })).toBe('mat120');
  });

  it('builds a fully lowercased, space-free course path', () => {
    expect(
      getCoursePath({
        slug: 'cse211sum26',
        code: 'CSE 211',
        institution: 'IUB',
      })
    ).toBe('/teaching/iub/cse211sum26');
  });

  it('path slug matches the standalone slug helper (no route desync)', () => {
    const course = { code: 'CSE 420', institution: 'BRACU' };
    expect(getCoursePath(course)).toBe(
      `/teaching/bracu/${getCourseSlug(course)}`
    );
  });
});

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
    expect(formatBreadcrumbTitle('cse211sum26')).toBe('CSE 211 Summer 2026');
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
