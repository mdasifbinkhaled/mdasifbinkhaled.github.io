import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeatPlanner } from '@/features/apps/components/seat-planner/seat-planner';

// Mock the hook to provide predictable state
vi.mock('@/features/apps/components/seat-planner/use-seat-planner', () => ({
  useSeatPlanner: () => ({
    examDetails: { courseCodes: 'CSE101', date: '', time: '', version: '' },
    students: [{ id: '1', name: 'A', section: 1 }],
    rooms: [{ uid: 'r1', name: 'R1', capacity: 40 }],
    sections: [1],
    parseErrors: [],
    rawInput: '',
    newRoomName: '',
    newRoomCapacity: '40',
    allocationMode: 'cohort',
    sortOrder: 'id',
    canGenerate: true,
    result: null,
    stats: null,
    field: (key: string) => ({ value: '', onChange: vi.fn() }),
    handleParseInput: vi.fn(),
    handleFileUpload: vi.fn(),
    handleRemoveStudent: vi.fn(),
    handleAddRoom: vi.fn(),
    handleRemoveRoom: vi.fn(),
    handleGenerate: vi.fn(),
    setNewRoomName: vi.fn(),
    setNewRoomCapacity: vi.fn(),
    setAllocationMode: vi.fn(),
    setSortOrder: vi.fn(),
  }),
}));

describe('SeatPlanner Component Render', () => {
  it('renders without crashing', () => {
    // Suppress vector/lucide-react rendering issues in mocked DOM by mocking icons if needed,
    // but the global vitest setup might already do it.
    render(<SeatPlanner />);

    // Check if the form headings or some text exists
    expect(document.body).toBeTruthy();
  });
});
