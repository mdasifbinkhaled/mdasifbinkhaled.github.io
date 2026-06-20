import { describe, it, expect } from 'vitest';
import { parseFiles, parseText } from '@/shared/lib/parsers/tabular';
import { applySchema, inferMapping } from '@/shared/lib/parsers/schema';
import type { SchemaField } from '@/shared/lib/parsers/types';

type Student = 'id' | 'name' | 'section';
const STUDENT_FIELDS: readonly SchemaField<Student>[] = [
  {
    key: 'id',
    label: 'Student ID',
    required: true,
    aliases: ['id', 'student id', 'studentid'],
  },
  {
    key: 'name',
    label: 'Name',
    required: true,
    aliases: ['name', 'student name', 'full name'],
  },
  {
    key: 'section',
    label: 'Section',
    required: false,
    aliases: ['section', 'sec', 'group'],
  },
];

describe('parseText (PapaParse adapter)', () => {
  it('parses simple CSV with header row', () => {
    const out = parseText('id,name\n1,Alice\n2,Bob', 'test.csv');
    expect(out.headers).toEqual(['id', 'name']);
    expect(out.rows).toEqual([
      ['1', 'Alice'],
      ['2', 'Bob'],
    ]);
    expect(out.delimiter).toBe(',');
  });

  it('strips UTF-8 BOM', () => {
    const out = parseText('\uFEFFid,name\n1,Ada', 'bom.csv');
    expect(out.headers[0]).toBe('id');
  });

  it('handles CRLF line endings', () => {
    const out = parseText('id,name\r\n1,Alice\r\n2,Bob', 'crlf.csv');
    expect(out.rows).toHaveLength(2);
    expect(out.rows[1]).toEqual(['2', 'Bob']);
  });

  it('skips blank rows (greedy)', () => {
    const out = parseText('id,name\n\n1,Alice\n   \n2,Bob\n', 'blank.csv');
    expect(out.rows).toHaveLength(2);
  });

  it('sniffs TAB delimiter', () => {
    const out = parseText('id\tname\n1\tAlice', 'tsv.tsv');
    expect(out.delimiter).toBe('\t');
    expect(out.rows[0]).toEqual(['1', 'Alice']);
  });

  it('sniffs semicolon delimiter (EU CSV)', () => {
    const out = parseText('id;name\n1;Alice', 's.csv');
    expect(out.delimiter).toBe(';');
  });

  it('sniffs pipe delimiter', () => {
    const out = parseText('id|name\n1|Alice', 'p.csv');
    expect(out.delimiter).toBe('|');
  });

  it('synthesizes headers when no header row is detected', () => {
    const out = parseText('1,Alice\n2,Bob', 'noheader.csv');
    expect(out.headers).toEqual(['Column 1', 'Column 2']);
    expect(out.rows).toHaveLength(2);
  });

  it('pads short rows to match widest row', () => {
    const out = parseText('id,name,section\n1,Alice\n2,Bob,A', 'pad.csv');
    expect(out.rows[0]).toEqual(['1', 'Alice', '']);
    expect(out.rows[1]).toEqual(['2', 'Bob', 'A']);
  });

  it('trims surrounding whitespace in cells', () => {
    const out = parseText('id,name\n 1 , Alice ', 'ws.csv');
    expect(out.rows[0]).toEqual(['1', 'Alice']);
  });

  it('returns empty tabular data for empty input', () => {
    const out = parseText('', 'empty.csv');
    expect(out.headers).toEqual([]);
    expect(out.rows).toEqual([]);
  });

  it('handles quoted cells containing commas', () => {
    const out = parseText('id,name\n1,"Smith, John"', 'quoted.csv');
    expect(out.rows[0]).toEqual(['1', 'Smith, John']);
  });

  it('handles quoted cells with escaped quotes', () => {
    const out = parseText('id,name\n1,"O""Brien"', 'escaped.csv');
    expect(out.rows[0]).toEqual(['1', 'O"Brien']);
  });

  it('preserves row-level source metadata across multi-file parsing', async () => {
    const fileA = new File(['id,name\n1,Alice'], 'sec-1.csv', {
      type: 'text/csv',
    });
    const fileB = new File(['id,name\n2,Bob'], 'sec-2.csv', {
      type: 'text/csv',
    });
    Object.defineProperty(fileA, 'text', {
      value: async () => 'id,name\n1,Alice',
    });
    Object.defineProperty(fileB, 'text', {
      value: async () => 'id,name\n2,Bob',
    });

    const out = await parseFiles([fileA, fileB]);

    expect(out.files).toEqual([
      { source: 'sec-1.csv', rowCount: 1 },
      { source: 'sec-2.csv', rowCount: 1 },
    ]);
    expect(out.rowSources).toEqual(['sec-1.csv', 'sec-2.csv']);
  });

  it('reorders matching headers from later files to the first file order', async () => {
    const fileA = new File(['id,name,section\n1,Alice,1'], 'sec-1.csv', {
      type: 'text/csv',
    });
    const fileB = new File(['section,name,id\n2,Bob,2'], 'sec-2.csv', {
      type: 'text/csv',
    });
    Object.defineProperty(fileA, 'text', {
      value: async () => 'id,name,section\n1,Alice,1',
    });
    Object.defineProperty(fileB, 'text', {
      value: async () => 'section,name,id\n2,Bob,2',
    });

    const out = await parseFiles([fileA, fileB]);

    expect(out.headers).toEqual(['id', 'name', 'section']);
    expect(out.rows).toEqual([
      ['1', 'Alice', '1'],
      ['2', 'Bob', '2'],
    ]);
    expect(out.warnings).toContain(
      'Reordered columns from "sec-2.csv" to match the first file.'
    );
  });

  it('disambiguates duplicate source filenames in multi-file parsing', async () => {
    const fileA = new File(['id,name\n1,Alice'], 'students.csv', {
      type: 'text/csv',
    });
    const fileB = new File(['id,name\n2,Bob'], 'students.csv', {
      type: 'text/csv',
    });
    Object.defineProperty(fileA, 'text', {
      value: async () => 'id,name\n1,Alice',
    });
    Object.defineProperty(fileB, 'text', {
      value: async () => 'id,name\n2,Bob',
    });

    const out = await parseFiles([fileA, fileB]);

    expect(out.files).toEqual([
      { source: 'students.csv', rowCount: 1 },
      { source: 'students.csv (2)', rowCount: 1 },
    ]);
    expect(out.rowSources).toEqual(['students.csv', 'students.csv (2)']);
    expect(out.source).toBe('students.csv, students.csv');
  });

  it('skips later files whose headers differ despite matching column count', async () => {
    const fileA = new File(['id,name\n1,Alice'], 'group-a.csv', {
      type: 'text/csv',
    });
    const fileB = new File(['id,program\n2,CSE'], 'group-b.csv', {
      type: 'text/csv',
    });
    Object.defineProperty(fileA, 'text', {
      value: async () => 'id,name\n1,Alice',
    });
    Object.defineProperty(fileB, 'text', {
      value: async () => 'id,program\n2,CSE',
    });

    const out = await parseFiles([fileA, fileB]);

    expect(out.rows).toEqual([['1', 'Alice']]);
    expect(out.warnings).toContain(
      'Skipped "group-b.csv": headers do not match the first file.'
    );
  });

  it('skips later files with mismatched column counts to prevent header-alignment corruption', async () => {
    const fileA = new File(['id,name\n1,Alice'], 'group-a.csv', {
      type: 'text/csv',
    });
    const fileB = new File(['id,name,section\n2,Bob,A'], 'group-b.csv', {
      type: 'text/csv',
    });
    Object.defineProperty(fileA, 'text', {
      value: async () => 'id,name\n1,Alice',
    });
    Object.defineProperty(fileB, 'text', {
      value: async () => 'id,name,section\n2,Bob,A',
    });

    const out = await parseFiles([fileA, fileB]);

    expect(out.rows).toEqual([['1', 'Alice']]);
    expect(out.warnings).toContain(
      'Skipped "group-b.csv": 3 columns vs first file\'s 2.'
    );
  });
});

// ── AUD-013: multi-file merge / alignment ───────────────────────────────
//
// `parseFiles` takes headers from the FIRST file, then for each later file:
//   • skips on column-count mismatch (covered above),
//   • skips on header-set mismatch (covered above),
//   • reorders columns when headers match but are out of order (covered),
//   • otherwise concatenates rows, preserving per-row + per-file provenance.
// These tests cover the merge bookkeeping and header-detection edges that
// lacked direct coverage.

const csvFile = (name: string, body: string): File => {
  const file = new File([body], name, { type: 'text/csv' });
  Object.defineProperty(file, 'text', { value: async () => body });
  return file;
};

describe('parseFiles — merge provenance & alignment (AUD-013)', () => {
  it('merges 3 same-header files into one dataset with per-file source preserved', async () => {
    const a = csvFile('a.csv', 'id,name\n1,Alice');
    const b = csvFile('b.csv', 'id,name\n2,Bob\n3,Cara');
    const c = csvFile('c.csv', 'id,name\n4,Dan');

    const out = await parseFiles([a, b, c]);

    expect(out.headers).toEqual(['id', 'name']);
    expect(out.rows).toEqual([
      ['1', 'Alice'],
      ['2', 'Bob'],
      ['3', 'Cara'],
      ['4', 'Dan'],
    ]);
    // per-row provenance follows the contributing file
    expect(out.rowSources).toEqual(['a.csv', 'b.csv', 'b.csv', 'c.csv']);
    // per-file row counts preserved in order
    expect(out.files).toEqual([
      { source: 'a.csv', rowCount: 1 },
      { source: 'b.csv', rowCount: 2 },
      { source: 'c.csv', rowCount: 1 },
    ]);
    // combined source label lists every input filename
    expect(out.source).toBe('a.csv, b.csv, c.csv');
    // merge banner warning is emitted
    expect(out.warnings).toContain('Merging 3 files (a.csv, b.csv, c.csv).');
  });

  it('skipped files contribute neither rows nor file/source provenance', async () => {
    const a = csvFile('a.csv', 'id,name\n1,Alice');
    const bad = csvFile('bad.csv', 'id,program\n2,CSE');
    const c = csvFile('c.csv', 'id,name\n3,Cara');

    const out = await parseFiles([a, bad, c]);

    expect(out.rows).toEqual([
      ['1', 'Alice'],
      ['3', 'Cara'],
    ]);
    expect(out.rowSources).toEqual(['a.csv', 'c.csv']);
    expect(out.files).toEqual([
      { source: 'a.csv', rowCount: 1 },
      { source: 'c.csv', rowCount: 1 },
    ]);
    expect(out.warnings).toContain(
      'Skipped "bad.csv": headers do not match the first file.'
    );
  });

  it('refuses to align when the base file has duplicate headers', async () => {
    // createAlignedRows returns null when reordering is needed but either
    // header set has duplicates — the later file is skipped, not corrupted.
    const a = csvFile('a.csv', 'qty,qty\n1,2');
    const b = csvFile('b.csv', 'qty,total\n3,4');

    const out = await parseFiles([a, b]);

    // base headers come from file A (all-numeric first body row 1,2 is data)
    expect(out.headers).toEqual(['qty', 'qty']);
    // B is skipped: its header set differs from base's
    expect(out.rows).toEqual([['1', '2']]);
    expect(out.warnings).toContain(
      'Skipped "b.csv": headers do not match the first file.'
    );
  });

  it('skips a reorder when the incoming file has duplicate headers', async () => {
    // Base has unique headers but incoming repeats one — createAlignedRows
    // bails (returns null) rather than guess the mapping.
    const a = csvFile('a.csv', 'id,name\n1,Alice');
    const b = csvFile('b.csv', 'name,name\nBob,Bobby');

    const out = await parseFiles([a, b]);

    expect(out.rows).toEqual([['1', 'Alice']]);
    expect(out.warnings).toContain(
      'Skipped "b.csv": headers do not match the first file.'
    );
  });

  it('an all-numeric first row is treated as DATA, not headers (synthesizes headers)', async () => {
    // looksLikeHeader: numericCells(2) >= alphaCells(0) → not a header.
    const a = csvFile('a.csv', '10,20\n30,40');
    const b = csvFile('b.csv', '50,60');

    const out = await parseFiles([a, b]);

    // synthesized header names; first row stays as data
    expect(out.headers).toEqual(['Column 1', 'Column 2']);
    expect(out.rows).toEqual([
      ['10', '20'],
      ['30', '40'],
      ['50', '60'],
    ]);
    // synthesized headers match across both files → rows merge cleanly
    expect(out.warnings).not.toContain(
      'Skipped "b.csv": headers do not match the first file.'
    );
  });
});

describe('inferMapping', () => {
  it('maps exact header matches', () => {
    const m = inferMapping(['id', 'name', 'section'], STUDENT_FIELDS);
    expect(m).toEqual({ id: 0, name: 1, section: 2 });
  });

  it('is case-insensitive', () => {
    const m = inferMapping(
      ['Student ID', 'Full Name', 'Group'],
      STUDENT_FIELDS
    );
    expect(m).toEqual({ id: 0, name: 1, section: 2 });
  });

  it('falls back to substring match', () => {
    const m = inferMapping(
      ['stu_id', 'student_name', 'sec_no'],
      STUDENT_FIELDS
    );
    expect(m.id).toBe(0);
    expect(m.name).toBe(1);
    expect(m.section).toBe(2);
  });

  it('returns null for fields with no match', () => {
    const m = inferMapping(['foo', 'bar'], STUDENT_FIELDS);
    expect(m.id).toBeNull();
    expect(m.name).toBeNull();
    expect(m.section).toBeNull();
  });
});

describe('applySchema', () => {
  it('maps rows using provided column indices', () => {
    const data = parseText('id,name,section\n1,Alice,A\n2,Bob,B', 'test.csv');
    const mapping = inferMapping(data.headers, STUDENT_FIELDS);
    const res = applySchema(data, STUDENT_FIELDS, mapping);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual([
        { id: '1', name: 'Alice', section: 'A' },
        { id: '2', name: 'Bob', section: 'B' },
      ]);
    }
  });

  it('flags rows missing required fields', () => {
    const data = parseText('id,name\n1,Alice\n,Bob', 'miss.csv');
    const mapping = inferMapping(data.headers, STUDENT_FIELDS);
    const res = applySchema(data, STUDENT_FIELDS, mapping);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toHaveLength(1);
      expect(res.errors).toHaveLength(1);
      expect(res.errors[0]?.row).toBe(2);
    }
  });

  it('runs field-level parsers and reports their errors', () => {
    const fields: readonly SchemaField<'credits'>[] = [
      {
        key: 'credits',
        label: 'Credits',
        required: true,
        aliases: ['credits'],
        parse: (raw) => {
          const n = Number(raw);
          if (!Number.isFinite(n) || n <= 0)
            throw new Error(`invalid "${raw}"`);
          return n;
        },
      },
    ];
    const data = parseText('credits\n3\nfoo\n4.5', 'c.csv');
    const mapping = inferMapping(data.headers, fields);
    const res = applySchema(data, fields, mapping);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual([{ credits: 3 }, { credits: 4.5 }]);
      expect(res.errors).toHaveLength(1);
      expect(res.errors[0]?.message).toContain('invalid "foo"');
    }
  });

  it('uses per-file defaults when a field has no mapped column', () => {
    const data = parseText('id,name\n1,Alice\n2,Bob', 'sec-2.csv');
    const mapping = inferMapping(data.headers, STUDENT_FIELDS);
    const res = applySchema(data, STUDENT_FIELDS, mapping, {
      fileDefaults: {
        section: {
          'sec-2.csv': '2',
        },
      },
    });

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual([
        { id: '1', name: 'Alice', section: '2' },
        { id: '2', name: 'Bob', section: '2' },
      ]);
    }
  });

  it('passes through configured additional columns', () => {
    const data = parseText('id,name,label\n1,Alice,VIP', 'extra.csv');
    const mapping = inferMapping(data.headers, STUDENT_FIELDS);
    const res = applySchema(data, STUDENT_FIELDS, mapping, {
      extraColumns: [{ key: 'Label', columnIndex: 2, header: 'label' }],
    });

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual([
        { id: '1', name: 'Alice', section: '', Label: 'VIP' },
      ]);
    }
  });
});
