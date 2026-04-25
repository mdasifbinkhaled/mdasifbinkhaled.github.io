import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
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
