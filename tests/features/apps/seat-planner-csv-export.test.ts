import { describe, expect, it, vi } from 'vitest';

const { downloadFileMock } = vi.hoisted(() => ({
  downloadFileMock: vi.fn(),
}));

vi.mock('@/shared/lib/download-file', () => ({
  downloadFile: downloadFileMock,
}));

import { exportMasterListCSV } from '@/features/apps/components/seat-planner/csv-export';

describe('seat-planner CSV export', () => {
  it('includes preserved extra student columns in the exported CSV', () => {
    exportMasterListCSV(
      [
        {
          id: '23101001',
          name: 'Alice Rahman',
          section: 1,
          room: 'BC6007-S',
          extras: { Program: 'CSE', Shift: 'Morning' },
        },
        {
          id: '23101002',
          name: 'Bob Khan',
          section: 2,
          room: 'BC6008-S',
          extras: { Program: 'EEE' },
        },
      ],
      {
        courseCodes: 'CSE 211',
        courseTitle: 'Algorithms',
        examType: 'Final Examination',
        semester: 'Autumn',
        year: '2026',
        department: 'Department of CSE',
        university: 'IUB',
      }
    );

    expect(downloadFileMock).toHaveBeenCalledTimes(1);

    const [content, filename, mimeType] = downloadFileMock.mock.calls[0] ?? [];
    expect(mimeType).toBe('text/csv');
    expect(filename).toContain('master-list');
    expect(content).toContain(
      'SL,Student ID,Student Name,Section,Room Number,Program,Shift'
    );
    expect(content).toContain('1,23101001,Alice Rahman,1,BC6007-S,CSE,Morning');
    expect(content).toContain('2,23101002,Bob Khan,2,BC6008-S,EEE,');
  });
});
