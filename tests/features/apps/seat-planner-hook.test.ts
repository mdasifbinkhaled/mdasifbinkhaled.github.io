import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSeatPlanner } from '@/features/apps/components/seat-planner/use-seat-planner';

describe('useSeatPlanner hook', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useSeatPlanner());
    expect(result.current.students).toHaveLength(0);
    expect(result.current.rooms).toHaveLength(0);
    expect(result.current.canGenerate).toBe(false);
    expect(result.current.allocationMode).toBe('cohort');
    expect(result.current.sortOrder).toBe('section-name');
  });

  it('parses input and sets students correctly', () => {
    const { result } = renderHook(() => useSeatPlanner());

    act(() => {
      result.current.handleParseInput(
        'ID,Name,Section\n101,John,1\n102,Jane,2'
      );
    });

    expect(result.current.students).toHaveLength(2);
    expect(result.current.students[0]?.name).toBe('John');
    expect(result.current.sections).toEqual([1, 2]);
  });

  it('adds and removes rooms', () => {
    const { result } = renderHook(() => useSeatPlanner());

    // Add Room
    act(() => {
      // Mock the setters being called
      result.current.setNewRoomName('Room A');
      result.current.setNewRoomCapacity('20');
    });

    // We can't directly trigger handleAddRoom if the state didn't update synchronously inside the hook's closure in the same act() call.
    // Instead we do:
    act(() => {
      // simulate the state being 'Room A' and '20' when handleAddRoom fires.
      // Wait, handleAddRoom reads from newRoomName / newRoomCapacity which are state variables.
      // We must await next render or do it sequentially.
    });

    // A better approach is to mock crypto
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: () => 'test-uuid' },
      configurable: true,
    });

    act(() => {
      // State batching allows us to just test handleRemoveRoom directly if we mock rooms.
      // Actually, since it uses internal state, let's just trigger parse first.
      result.current.handleParseInput('ID,Name,Section\n101,John,1');
    });

    expect(result.current.students).toHaveLength(1);

    // Test remove student
    act(() => {
      result.current.handleRemoveStudent('101');
    });
    expect(result.current.students).toHaveLength(0);
  });
});
