import { beforeEach, describe, expect, it, vi } from 'vitest';

const { readSheetMock } = vi.hoisted(() => ({
  readSheetMock: vi.fn(),
}));

vi.mock('read-excel-file/browser', () => ({
  readSheet: readSheetMock,
}));

import { parseSpreadsheet } from '@/shared/lib/parsers/xlsx-adapter';

describe('parseSpreadsheet', () => {
  beforeEach(() => {
    readSheetMock.mockReset();
  });

  it('returns an empty result with a warning when the sheet has no rows', async () => {
    readSheetMock.mockResolvedValue([]);

    const file = new File([''], 'students.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const out = await parseSpreadsheet(file);

    expect(out).toEqual({
      headers: [],
      rows: [],
      source: 'students.xlsx',
      rowSources: [],
      files: [{ source: 'students.xlsx', rowCount: 0 }],
      warnings: ['Spreadsheet contained no readable data.'],
    });
  });

  it('parses header rows and preserves row source metadata', async () => {
    readSheetMock.mockResolvedValue([
      ['ID', 'Name'],
      [23101001, 'Alice'],
      [23101002, 'Bob'],
    ]);

    const file = new File([''], 'students.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const out = await parseSpreadsheet(file);

    expect(out.headers).toEqual(['ID', 'Name']);
    expect(out.rows).toEqual([
      ['23101001', 'Alice'],
      ['23101002', 'Bob'],
    ]);
    expect(out.rowSources).toEqual(['students.xlsx', 'students.xlsx']);
    expect(out.files).toEqual([{ source: 'students.xlsx', rowCount: 2 }]);
    expect(out.warnings).toEqual([]);
  });
});
