import { describe, expect, it } from 'vitest';
import {
  buildInitialFileDefaults,
  getParsedFiles,
} from '@/shared/components/common/data-importer.utils';
import type { SchemaField, TabularData } from '@/shared/lib/parsers/types';

describe('data-importer.utils', () => {
  describe('getParsedFiles', () => {
    it('returns an empty list when data is null', () => {
      expect(getParsedFiles(null)).toEqual([]);
    });

    it('prefers the explicit files list when present', () => {
      const data: TabularData = {
        headers: ['id'],
        rows: [['1'], ['2']],
        source: 'a.csv, b.csv',
        files: [
          { source: 'a.csv', rowCount: 1 },
          { source: 'b.csv', rowCount: 1 },
        ],
        warnings: [],
      };

      expect(getParsedFiles(data)).toEqual([
        { source: 'a.csv', rowCount: 1 },
        { source: 'b.csv', rowCount: 1 },
      ]);
    });

    it('synthesizes a single file from the source label when no files list', () => {
      const data: TabularData = {
        headers: ['id'],
        rows: [['1'], ['2'], ['3']],
        source: 'pasted.csv',
        warnings: [],
      };

      expect(getParsedFiles(data)).toEqual([
        { source: 'pasted.csv', rowCount: 3 },
      ]);
    });

    it('returns an empty list when there is neither a files list nor a source', () => {
      const data: TabularData = {
        headers: ['id'],
        rows: [['1']],
        source: '',
        warnings: [],
      };

      expect(getParsedFiles(data)).toEqual([]);
    });
  });

  describe('buildInitialFileDefaults', () => {
    const fields: readonly SchemaField<'id' | 'section'>[] = [
      {
        key: 'id',
        label: 'Student ID',
        required: true,
        aliases: ['id'],
      },
      {
        key: 'section',
        label: 'Section',
        required: false,
        aliases: ['section'],
        perFileValue: {
          infer: (source) => (source.includes('sec-2') ? '2' : undefined),
        },
      },
    ];

    it('only includes fields configured with perFileValue', () => {
      const data: TabularData = {
        headers: ['id'],
        rows: [['1']],
        source: 'sec-2.csv',
        files: [{ source: 'sec-2.csv', rowCount: 1 }],
        warnings: [],
      };

      const defaults = buildInitialFileDefaults(data, fields);

      expect(Object.keys(defaults)).toEqual(['section']);
      expect(defaults.section).toEqual({ 'sec-2.csv': '2' });
    });

    it('falls back to an empty string when inference yields nothing', () => {
      const data: TabularData = {
        headers: ['id'],
        rows: [['1']],
        source: 'other.csv',
        files: [{ source: 'other.csv', rowCount: 1 }],
        warnings: [],
      };

      const defaults = buildInitialFileDefaults(data, fields);

      expect(defaults.section).toEqual({ 'other.csv': '' });
    });
  });
});
