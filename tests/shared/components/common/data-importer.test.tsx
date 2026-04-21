import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { parseFilesMock } = vi.hoisted(() => ({
  parseFilesMock: vi.fn(),
}));

vi.mock('@/shared/lib/parsers/tabular', async () => {
  const actual = await vi.importActual<
    typeof import('@/shared/lib/parsers/tabular')
  >('@/shared/lib/parsers/tabular');

  return {
    ...actual,
    parseFiles: parseFilesMock,
  };
});

import { DataImporter } from '@/shared/components/common/data-importer';
import type { SchemaField } from '@/shared/lib/parsers/types';

type ImportKey = 'name';

const fields: readonly SchemaField<ImportKey>[] = [
  {
    key: 'name',
    label: 'Name',
    required: true,
    aliases: ['name'],
  },
];

describe('DataImporter', () => {
  beforeEach(() => {
    parseFilesMock.mockReset();
  });

  it('opens on the paste tab by default', () => {
    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        fields={fields}
        title="Import data"
        description="Import some rows"
        onCommit={vi.fn()}
      />
    );

    expect(screen.getByRole('tab', { name: 'Paste' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(
      screen.getByPlaceholderText(/paste csv, tsv, or spreadsheet text here/i)
    ).toBeInTheDocument();
    expect(document.body.querySelector('input[type="file"]')).toBeNull();
  });

  it('can open directly on the upload tab for file-first flows', () => {
    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        defaultTab="upload"
        fields={fields}
        title="Import data"
        description="Import some rows"
        onCommit={vi.fn()}
      />
    );

    expect(screen.getByRole('tab', { name: 'Upload file' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(
      screen.getByText(/click to choose one or more files/i)
    ).toBeInTheDocument();

    const input = document.body.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;

    expect(input).not.toBeNull();
    expect(input?.multiple).toBe(true);
  });

  it('parses multiple uploaded files through the shared parser', async () => {
    parseFilesMock.mockResolvedValue({
      headers: ['Name'],
      rows: [['Alice'], ['Bob']],
      source: 'group-a.csv, group-b.csv',
      warnings: [],
    });

    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        defaultTab="upload"
        fields={fields}
        title="Import data"
        description="Import some rows"
        onCommit={vi.fn()}
      />
    );

    const input = document.body.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileA = new File(['Name\nAlice'], 'group-a.csv', {
      type: 'text/csv',
    });
    const fileB = new File(['Name\nBob'], 'group-b.csv', {
      type: 'text/csv',
    });

    fireEvent.change(input, {
      target: { files: [fileA, fileB] },
    });

    await waitFor(() => {
      expect(parseFilesMock).toHaveBeenCalledTimes(1);
    });

    expect(
      (parseFilesMock.mock.calls[0]?.[0] as File[]).map((file) => file.name)
    ).toEqual(['group-a.csv', 'group-b.csv']);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(
        screen.getByText(/parsed from group-a\.csv, group-b\.csv/i)
      ).toBeInTheDocument();
    });
  });
});
