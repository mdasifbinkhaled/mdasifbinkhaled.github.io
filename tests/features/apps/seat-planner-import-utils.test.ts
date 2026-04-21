import { describe, expect, it } from 'vitest';
import {
  extractStudentExtras,
  getRoomNameKey,
  inferSectionFromSource,
  normalizeImportedRoom,
  normalizeImportedStudent,
  validateRoomDraft,
} from '@/features/apps/components/seat-planner/import-utils';

describe('seat-planner import utils', () => {
  it('infers a section from common filename patterns', () => {
    expect(inferSectionFromSource('students-sec-2.csv')).toBe('2');
    expect(inferSectionFromSource('section_14.xlsx')).toBe('14');
    expect(inferSectionFromSource('group 3.tsv')).toBe('3');
    expect(inferSectionFromSource('students.csv')).toBeUndefined();
  });

  it('preserves non-core student columns as extras', () => {
    expect(
      extractStudentExtras({
        id: '1',
        name: 'Alice',
        section: 2,
        Program: 'CSE',
        Note: 'Front row',
      })
    ).toEqual({ Program: 'CSE', Note: 'Front row' });
  });

  it('normalizes imported students and defaults invalid sections to 1', () => {
    expect(
      normalizeImportedStudent({
        id: '  23101001 ',
        name: ' Alice Rahman ',
        section: '',
        Program: 'CSE',
      })
    ).toEqual({
      id: '23101001',
      name: 'Alice Rahman',
      section: 1,
      extras: { Program: 'CSE' },
    });
  });

  it('validates room drafts case-insensitively', () => {
    expect(
      validateRoomDraft(' bc6007-s ', '40', [
        { uid: 'r1', name: 'BC6007-S', capacity: 35 },
      ])
    ).toBe('A room with this name already exists.');
  });

  it('normalizes imported room rows', () => {
    expect(
      normalizeImportedRoom({
        name: '  BC6008-S  ',
        capacity: '60',
      })
    ).toEqual({ name: 'BC6008-S', capacity: 60 });
    expect(getRoomNameKey(' BC6008-S ')).toBe('bc6008-s');
  });
});
