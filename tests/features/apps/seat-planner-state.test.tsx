import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { toastSuccessMock, toastErrorMock } = vi.hoisted(() => ({
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

const { exportMasterListCSVMock } = vi.hoisted(() => ({
  exportMasterListCSVMock: vi.fn(),
}));

const { html2canvasMock } = vi.hoisted(() => ({
  html2canvasMock: vi.fn(),
}));

const {
  generateMasterListPDFMock,
  generateRoomSheetsPDFMock,
  generateCombinedPDFMock,
} = vi.hoisted(() => ({
  generateMasterListPDFMock: vi.fn(() => {
    throw new Error('pdf failed');
  }),
  generateRoomSheetsPDFMock: vi.fn(),
  generateCombinedPDFMock: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

vi.mock('@/features/apps/components/seat-planner/csv-export', () => ({
  exportMasterListCSV: exportMasterListCSVMock,
}));

vi.mock('@/features/apps/components/seat-planner/pdf-export', () => ({
  generateMasterListPDF: generateMasterListPDFMock,
  generateRoomSheetsPDF: generateRoomSheetsPDFMock,
  generateCombinedPDF: generateCombinedPDFMock,
}));

vi.mock('html2canvas', () => ({
  default: html2canvasMock,
}));

import {
  useSeatPlanner,
  SEAT_TOOL_SLUG,
} from '@/features/apps/components/seat-planner/use-seat-planner';
import { DEFAULT_EXAM_DETAILS } from '@/features/apps/components/seat-planner/types';
import { buildKey } from '@/shared/lib/storage/namespaced';

describe('useSeatPlanner', () => {
  beforeEach(() => {
    localStorage.clear();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();
    exportMasterListCSVMock.mockReset();
    html2canvasMock.mockReset();
    generateMasterListPDFMock.mockClear();
    generateRoomSheetsPDFMock.mockClear();
    generateCombinedPDFMock.mockClear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('imports data, generates allocations, and supports export error handling', async () => {
    const { result } = renderHook(() => useSeatPlanner());

    act(() => {
      result.current.handleImportStudents(
        [
          {
            id: '23101001',
            name: 'Alice Rahman',
            section: 1,
            Program: 'CSE',
          },
          {
            id: '23101002',
            name: 'Bob Khan',
            section: 2,
          },
        ],
        {
          source: 'students.csv',
          mergeStrategy: 'replace',
          warnings: [],
          rowsSkipped: 1,
          extraColumns: ['Program'],
        }
      );
    });

    act(() => {
      result.current.handleImportRooms(
        [
          { name: 'BC6007-S', capacity: 1 },
          { name: ' bc6007-s ', capacity: 1 },
          { name: 'BC6008-S', capacity: 1 },
        ],
        {
          source: 'rooms.csv',
          mergeStrategy: 'replace',
          warnings: [],
          rowsSkipped: 1,
        }
      );
    });

    expect(result.current.students).toHaveLength(2);
    expect(result.current.students[0]?.extras).toEqual({ Program: 'CSE' });
    expect(result.current.rooms).toHaveLength(2);
    expect(result.current.canGenerate).toBe(true);
    expect(toastSuccessMock).toHaveBeenCalledWith(
      expect.stringContaining('extra field')
    );
    expect(toastSuccessMock).toHaveBeenCalledWith(
      expect.stringContaining('duplicate name')
    );

    act(() => {
      result.current.handleGenerate();
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.stats?.assigned).toBe(2);

    act(() => {
      result.current.setAllocationMode('mixed');
    });

    expect(result.current.rooms).toHaveLength(2);
    expect(result.current.result).not.toBeNull();
    expect(result.current.stats?.assigned).toBe(2);

    act(() => {
      result.current.setSortOrder('id');
    });

    expect(result.current.rooms).toHaveLength(2);
    expect(result.current.result).not.toBeNull();

    act(() => {
      result.current.handleReassign('23101001', 'BC6008-S');
    });

    expect(
      result.current.result?.allocations.some((allocation) =>
        allocation.students.some(
          (student) => student.id === '23101001' && student.room === 'BC6008-S'
        )
      )
    ).toBe(true);

    await act(async () => {
      await result.current.handleExportCSV();
    });

    expect(exportMasterListCSVMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.handleExportPDF('master');
    });

    expect(generateMasterListPDFMock).toHaveBeenCalledTimes(1);
    expect(toastErrorMock).toHaveBeenCalledWith(
      'PDF export failed. Please try again.'
    );

    await act(async () => {
      await result.current.handleExportPNG();
    });

    expect(toastErrorMock).toHaveBeenCalledWith(
      'PNG export is unavailable right now. Please try again.'
    );
  });

  it('validates room drafts, exports backups, updates metadata, and resets state', async () => {
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:seat-planner');
    const revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useSeatPlanner());

    act(() => {
      result.current.setNewRoomName('BC6007-S');
      result.current.setNewRoomCapacity('0');
    });
    act(() => {
      result.current.handleAddRoom();
    });

    expect(toastErrorMock).toHaveBeenCalledWith(
      'Capacity must be a positive whole number.'
    );
    expect(result.current.rooms).toHaveLength(0);

    act(() => {
      result.current.setNewRoomName('BC6007-S');
      result.current.setNewRoomCapacity('40');
    });
    act(() => {
      result.current.handleAddRoom();
    });

    expect(result.current.rooms).toHaveLength(1);
    expect(result.current.newRoomName).toBe('');
    expect(result.current.newRoomCapacity).toBe('40');

    act(() => {
      result.current.setSectionFacultyName(1, 'Dr. Karim');
      result.current.field('courseCodes').onChange({
        target: { value: 'CSE 211' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.sectionFaculty).toEqual({ 1: 'Dr. Karim' });
    expect(result.current.examDetails.courseCodes).toBe('CSE 211');

    await waitFor(() => {
      expect(localStorage.getItem(buildKey(SEAT_TOOL_SLUG, 'rooms'))).not.toBe(
        null
      );
    });

    act(() => {
      result.current.handleExportBackup();
    });

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:seat-planner');
    expect(toastSuccessMock).toHaveBeenCalledWith('Backup saved.');

    act(() => {
      result.current.handleResetAll();
    });

    expect(result.current.students).toEqual([]);
    expect(result.current.rooms).toEqual([]);
    expect(result.current.sectionFaculty).toEqual({});
    expect(result.current.examDetails).toEqual(DEFAULT_EXAM_DETAILS);
    expect(result.current.result).toBeNull();
    expect(toastSuccessMock).toHaveBeenCalledWith('Seat Planner reset.');

    clickSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it('exports a high-resolution PNG from the dedicated export document', async () => {
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:seat-plan-png');
    const revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const exportTarget = document.createElement('div');
    Object.defineProperty(exportTarget, 'scrollWidth', {
      configurable: true,
      value: 1280,
    });
    Object.defineProperty(exportTarget, 'scrollHeight', {
      configurable: true,
      value: 960,
    });
    document.body.appendChild(exportTarget);

    html2canvasMock.mockResolvedValue({
      toBlob: (callback: (blob: Blob | null) => void) => {
        callback(new Blob(['png'], { type: 'image/png' }));
      },
    });

    const { result } = renderHook(() => useSeatPlanner());

    act(() => {
      result.current.handleImportStudents(
        [{ id: '23101001', name: 'Alice Rahman', section: 1 }],
        {
          source: 'students.csv',
          mergeStrategy: 'replace',
          warnings: [],
          rowsSkipped: 0,
        }
      );
      result.current.handleImportRooms([{ name: 'BC6007-S', capacity: 40 }], {
        source: 'rooms.csv',
        mergeStrategy: 'replace',
        warnings: [],
        rowsSkipped: 0,
      });
      result.current.handleGenerate();
      result.current.printRef.current = exportTarget;
    });

    await act(async () => {
      await result.current.handleExportPNG();
    });

    expect(html2canvasMock).toHaveBeenCalledWith(
      exportTarget,
      expect.objectContaining({
        backgroundColor: '#ffffff',
        width: 1280,
        height: 960,
        windowWidth: 1280,
        windowHeight: 960,
      })
    );
    expect(html2canvasMock.mock.calls[0]?.[1]?.scale).toBeGreaterThanOrEqual(2);
    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:seat-plan-png');

    exportTarget.remove();
    clickSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });
});
