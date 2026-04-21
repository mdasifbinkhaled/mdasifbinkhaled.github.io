import { describe, expect, it } from 'vitest';
import { inferMapping } from '@/shared/lib/parsers/schema';
import type { SchemaField } from '@/shared/lib/parsers/types';
import {
  extractStudentExtras,
  getRoomNameKey,
  inferSectionFromSource,
  normalizeImportedRoom,
  normalizeImportedStudent,
  parseRoomImportText,
  validateRoomDraft,
} from '@/features/apps/components/seat-planner/import-utils';

const ROOM_FIELDS: readonly SchemaField<'name' | 'capacity'>[] = [
  {
    key: 'name',
    label: 'Room name',
    required: true,
    aliases: ['name', 'room', 'room name', 'venue', 'column 1'],
  },
  {
    key: 'capacity',
    label: 'Capacity',
    required: true,
    aliases: ['capacity', 'seats', 'size', 'column 2'],
  },
];

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

  it('parses room paste text with flexible separators and optional headers', () => {
    expect(
      parseRoomImportText('Room Capacity\nBC6007-S 40\nLab A 32')
    ).toMatchObject({
      headers: ['Room', 'Capacity'],
      rows: [
        ['BC6007-S', '40'],
        ['Lab A', '32'],
      ],
    });

    expect(parseRoomImportText('Room, Capacity\nBC6008-S, 60')).toMatchObject({
      headers: ['Room', 'Capacity'],
      rows: [['BC6008-S', '60']],
    });

    expect(parseRoomImportText('BC6009-S 45\nLab B, 28')).toMatchObject({
      headers: ['Column 1', 'Column 2'],
      rows: [
        ['BC6009-S', '45'],
        ['Lab B', '28'],
      ],
    });
  });

  it('maps headerless room imports by default positional columns', () => {
    expect(inferMapping(['Column 1', 'Column 2'], ROOM_FIELDS)).toEqual({
      name: 0,
      capacity: 1,
    });
  });
});
