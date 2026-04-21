import { describe, it, expect } from 'vitest';
import { parseText } from '@/shared/lib/parsers/tabular';
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
});
