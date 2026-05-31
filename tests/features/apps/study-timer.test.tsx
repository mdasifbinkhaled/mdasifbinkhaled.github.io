import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StudyTimer } from '@/features/apps/components/study-timer/study-timer';

beforeEach(() => {
  localStorage.clear();
});

describe('StudyTimer', () => {
  it('renders the default focus session', () => {
    render(<StudyTimer />);

    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Focus' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('switches between focus and break sessions', () => {
    render(<StudyTimer />);

    fireEvent.click(screen.getByRole('button', { name: 'Short Break' }));
    expect(screen.getByText('05:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Short Break' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Long Break' }));
    expect(screen.getByText('15:00')).toBeInTheDocument();
  });

  it('updates the focus duration from settings and persists it', () => {
    render(<StudyTimer />);

    fireEvent.click(screen.getByRole('button', { name: /show/i }));
    fireEvent.change(screen.getByDisplayValue('25'), {
      target: { value: '15' },
    });

    expect(screen.getByText('15:00')).toBeInTheDocument();

    const savedSettings = localStorage.getItem('abk:v1:study-timer:settings');
    expect(savedSettings).not.toBeNull();
    expect(savedSettings).toContain('"focusMinutes":15');
  });

  it('skips from a focus session into the next break', () => {
    render(<StudyTimer />);

    fireEvent.click(
      screen.getByRole('button', { name: /skip to next session/i })
    );

    expect(screen.getByText('05:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Short Break' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});

describe('StudyTimer countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('counts down while running', () => {
    render(<StudyTimer />);

    fireEvent.click(screen.getByRole('button', { name: 'Start timer' }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('24:57')).toBeInTheDocument();
  });

  it('preserves the remaining time when paused and resumed', () => {
    render(<StudyTimer />);

    fireEvent.click(screen.getByRole('button', { name: 'Start timer' }));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('24:55')).toBeInTheDocument();

    // Pausing must NOT reset the countdown back to the full duration.
    fireEvent.click(screen.getByRole('button', { name: 'Pause timer' }));
    expect(screen.getByText('24:55')).toBeInTheDocument();

    // Time stays frozen while paused.
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText('24:55')).toBeInTheDocument();

    // Resuming continues from where it left off.
    fireEvent.click(screen.getByRole('button', { name: 'Start timer' }));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('24:53')).toBeInTheDocument();
  });

  it('advances to the next session when the countdown completes', () => {
    render(<StudyTimer />);

    // Shorten the focus duration to 1 minute to keep the test fast.
    fireEvent.click(screen.getByRole('button', { name: /show/i }));
    fireEvent.change(screen.getByDisplayValue('25'), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /hide/i }));

    expect(screen.getByText('01:00')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Start timer' }));
    // Tick one second at a time so the countdown ref stays in sync with the
    // flushed React state between interval callbacks.
    for (let i = 0; i < 60; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    // Focus completes and rolls into the short break.
    expect(screen.getByText('05:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Short Break' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
