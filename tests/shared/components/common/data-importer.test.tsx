import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
import type {
  AdditionalPerFileField,
  SchemaField,
} from '@/shared/lib/parsers/types';

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
  async function selectExtraColumnSource(label: string) {
    const trigger = screen
      .getByText('Select source column')
      .closest('[role="combobox"]');

    if (!(trigger instanceof HTMLElement)) {
      throw new Error('Unable to locate the extra-column source selector.');
    }

    const user = userEvent.setup();
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: label }));
  }

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

  it('commits inferred per-file values together with source metadata', async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const sectionFields: readonly SchemaField<'id' | 'section'>[] = [
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
          type: 'number',
          inputMode: 'numeric',
          infer: (source) => (source.includes('sec-2') ? '2' : undefined),
        },
        parse: (raw) => Number(raw),
      },
    ];

    parseFilesMock.mockResolvedValue({
      headers: ['id'],
      rows: [['23101001']],
      source: 'sec-2.csv',
      rowSources: ['sec-2.csv'],
      files: [{ source: 'sec-2.csv', rowCount: 1 }],
      warnings: ['Used inferred section'],
    });

    render(
      <DataImporter<'id' | 'section'>
        open={true}
        onOpenChange={vi.fn()}
        defaultTab="upload"
        fields={sectionFields}
        title="Import students"
        description="Import some rows"
        onCommit={onCommit}
      />
    );

    const input = document.body.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['id\n23101001'], 'sec-2.csv', {
      type: 'text/csv',
    });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Section for sec-2.csv')).toHaveValue(2);
    });

    await user.click(screen.getByRole('button', { name: /commit/i }));

    expect(onCommit).toHaveBeenCalledWith(
      [{ id: '23101001', section: 2 }],
      expect.objectContaining({
        source: 'sec-2.csv',
        sourceFiles: ['sec-2.csv'],
        warnings: ['Used inferred section'],
        rowsSkipped: 0,
        extraColumns: [],
        perFileValues: {
          section: {
            'sec-2.csv': '2',
          },
        },
      })
    );
  });

  it('commits additional per-file metadata fields together with section defaults', async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const sectionFields: readonly SchemaField<'id' | 'section'>[] = [
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
          type: 'number',
          inputMode: 'numeric',
          infer: (source) => (source.includes('sec-4') ? '4' : undefined),
        },
        parse: (raw) => Number(raw),
      },
    ];
    const extraPerFileFields: readonly AdditionalPerFileField[] = [
      {
        key: 'faculty',
        label: 'Faculty',
        placeholder: 'Faculty name',
      },
    ];

    parseFilesMock.mockResolvedValue({
      headers: ['id'],
      rows: [['23101004']],
      source: 'sec-4.csv',
      rowSources: ['sec-4.csv'],
      files: [{ source: 'sec-4.csv', rowCount: 1 }],
      warnings: [],
    });

    render(
      <DataImporter<'id' | 'section'>
        open={true}
        onOpenChange={vi.fn()}
        defaultTab="upload"
        fields={sectionFields}
        title="Import students"
        description="Import some rows"
        extraPerFileFields={extraPerFileFields}
        onCommit={onCommit}
      />
    );

    const input = document.body.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { files: [new File(['id\n23101004'], 'sec-4.csv')] },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Section for sec-4.csv')).toHaveValue(4);
      expect(
        screen.getByLabelText('Faculty for sec-4.csv')
      ).toBeInTheDocument();
    });

    await user.type(
      screen.getByLabelText('Faculty for sec-4.csv'),
      'Dr. Nusrat Karim'
    );
    await user.click(screen.getByRole('button', { name: /commit/i }));

    expect(onCommit).toHaveBeenCalledWith(
      [{ id: '23101004', section: 4 }],
      expect.objectContaining({
        rowsSkipped: 0,
        perFileValues: {
          section: {
            'sec-4.csv': '4',
          },
          faculty: {
            'sec-4.csv': 'Dr. Nusrat Karim',
          },
        },
      })
    );
  });

  it('adds passthrough columns to committed rows', async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();

    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        fields={fields}
        title="Import data"
        description="Import some rows"
        allowExtraColumns
        onCommit={onCommit}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText(/paste csv, tsv, or spreadsheet text here/i),
      {
        target: { value: 'Name,Program\nAlice,CSE' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Parse' }));

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /add column/i }));

    const extraFieldInput = screen.getByLabelText(
      /additional column field name/i
    );
    await user.type(extraFieldInput, 'Program');
    await selectExtraColumnSource('Program');
    await user.click(screen.getByRole('button', { name: /commit/i }));

    expect(onCommit).toHaveBeenCalledWith(
      [{ name: 'Alice', Program: 'CSE' }],
      expect.objectContaining({
        extraColumns: ['Program'],
        rowsSkipped: 0,
      })
    );
  });

  it('treats additional-column duplicates case-insensitively', async () => {
    const user = userEvent.setup();

    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        fields={fields}
        title="Import data"
        description="Import some rows"
        allowExtraColumns
        onCommit={vi.fn()}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText(/paste csv, tsv, or spreadsheet text here/i),
      {
        target: { value: 'Name,Program\nAlice,CSE' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Parse' }));

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /add column/i }));
    await user.type(
      screen.getByLabelText(/additional column field name/i),
      'Name'
    );
    await selectExtraColumnSource('Program');

    expect(
      screen.getAllByText(
        /additional column "Name" duplicates an existing field/i
      )
    ).not.toHaveLength(0);
    expect(screen.getByRole('button', { name: /commit/i })).toBeDisabled();
  });

  it('supports single-file upload copy and surfaces parse warnings', async () => {
    parseFilesMock.mockResolvedValue({
      headers: ['Name'],
      rows: [['Alice']],
      source: 'group-a.csv',
      files: [{ source: 'group-a.csv', rowCount: 1 }],
      rowSources: ['group-a.csv'],
      warnings: ['Delimiter was inferred from file content.'],
    });

    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        defaultTab="upload"
        allowMultiple={false}
        fields={fields}
        title="Import data"
        description="Import some rows"
        onCommit={vi.fn()}
      />
    );

    expect(screen.getByText(/click to choose a file/i)).toBeInTheDocument();

    const input = document.body.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input.multiple).toBe(false);

    fireEvent.change(input, {
      target: { files: [new File(['Name\nAlice'], 'group-a.csv')] },
    });

    await waitFor(() => {
      expect(screen.getByText(/1 import note/i)).toBeInTheDocument();
      expect(
        screen.getAllByText(/delimiter was inferred from file content/i)
      ).not.toHaveLength(0);
    });
  });

  it('shows preview truncation and row diagnostics for invalid imports', async () => {
    const strictFields: readonly SchemaField<'id' | 'name'>[] = [
      {
        key: 'id',
        label: 'Student ID',
        required: true,
        aliases: ['id'],
      },
      {
        key: 'name',
        label: 'Name',
        required: true,
        aliases: ['name'],
      },
    ];

    const rows = Array.from(
      { length: 25 },
      (_, index) => `Student ${index + 1}`
    );

    render(
      <DataImporter<'id' | 'name'>
        open={true}
        onOpenChange={vi.fn()}
        fields={strictFields}
        title="Import data"
        description="Import some rows"
        onCommit={vi.fn()}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText(/paste csv, tsv, or spreadsheet text here/i),
      {
        target: { value: `Name\n${rows.join('\n')}` },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Parse' }));

    await waitFor(() => {
      expect(screen.getByText(/25 rows skipped/i)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/showing the first 20 of 25 rows/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/showing the first 5 row errors/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/review the import before committing/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /commit/i })).toBeDisabled();
  });

  it('removes extra-column drafts and restores the empty-state helper', async () => {
    const user = userEvent.setup();

    render(
      <DataImporter<ImportKey>
        open={true}
        onOpenChange={vi.fn()}
        fields={fields}
        title="Import data"
        description="Import some rows"
        allowExtraColumns
        onCommit={vi.fn()}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText(/paste csv, tsv, or spreadsheet text here/i),
      {
        target: { value: 'Name,Program\nAlice,CSE' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Parse' }));

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /add column/i }));
    expect(
      screen.queryByText(/optional passthrough columns are preserved/i)
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /remove additional column/i })
    );

    expect(
      screen.getByText(
        /optional passthrough columns are preserved on imported rows/i
      )
    ).toBeInTheDocument();
  });
});
