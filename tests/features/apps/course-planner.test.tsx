import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CoursePlanner } from '@/features/apps/components/course-planner/course-planner';
import { buildCoursePlan } from '@/features/apps/components/course-planner/course-plan-utils';

const { toast } = vi.hoisted(() => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('sonner', () => ({ toast }));

beforeEach(() => {
  localStorage.clear();
  toast.error.mockReset();
  toast.success.mockReset();
});

describe('buildCoursePlan', () => {
  it('rejects unknown prerequisites instead of dropping them silently', () => {
    const result = buildCoursePlan(
      [
        {
          code: 'CSE 211',
          title: 'Data Structures',
          credits: 3,
          prerequisiteCodes: ['CSE 999'],
        },
      ],
      { mergeStrategy: 'replace' }
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors[0]?.message).toContain('unknown prerequisites');
  });

  it('rejects prerequisite cycles before they reach the UI state', () => {
    const result = buildCoursePlan(
      [
        {
          code: 'CSE 110',
          title: 'Programming I',
          credits: 3,
          prerequisiteCodes: ['CSE 111'],
        },
        {
          code: 'CSE 111',
          title: 'Programming II',
          credits: 3,
          prerequisiteCodes: ['CSE 110'],
        },
      ],
      { mergeStrategy: 'replace' }
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors[0]?.message).toContain('Prerequisite cycle detected');
  });

  it('preserves completion state when a merge updates an existing course', () => {
    const existingPlan = buildCoursePlan(
      [
        {
          code: 'CSE 110',
          title: 'Programming I',
          credits: 3,
          prerequisiteCodes: [],
          completed: true,
        },
      ],
      { mergeStrategy: 'replace' }
    );

    expect(existingPlan.ok).toBe(true);
    if (!existingPlan.ok) return;

    const result = buildCoursePlan(
      [
        {
          code: 'CSE 110',
          title: 'Programming Language I',
          credits: 3,
          prerequisiteCodes: [],
        },
      ],
      {
        existingCourses: existingPlan.data,
        mergeStrategy: 'merge',
      }
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data[0]?.completed).toBe(true);
    expect(result.data[0]?.title).toBe('Programming Language I');
  });
});

describe('CoursePlanner', () => {
  it('blocks manual adds with unknown prerequisites and keeps the plan empty', () => {
    render(<CoursePlanner />);

    fireEvent.click(screen.getByRole('button', { name: /add course/i }));
    fireEvent.change(
      screen.getByPlaceholderText('Course code (e.g. CSE 211)'),
      { target: { value: 'CSE 211' } }
    );
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Data Structures' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Prerequisites (codes, comma-sep)'),
      {
        target: { value: 'CSE 999' },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining('unknown prerequisites')
    );
    expect(screen.getByText('No courses yet')).toBeInTheDocument();
  });

  it('adds valid courses and unlocks dependents only after prerequisites are done', () => {
    render(<CoursePlanner />);

    fireEvent.click(screen.getByRole('button', { name: /add course/i }));
    fireEvent.change(
      screen.getByPlaceholderText('Course code (e.g. CSE 211)'),
      { target: { value: 'CSE 110' } }
    );
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Programming I' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));

    fireEvent.click(screen.getByRole('button', { name: /add course/i }));
    fireEvent.change(
      screen.getByPlaceholderText('Course code (e.g. CSE 211)'),
      { target: { value: 'CSE 111' } }
    );
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Programming II' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Prerequisites (codes, comma-sep)'),
      {
        target: { value: 'CSE 110' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: /^add$/i }));

    const markDoneButtons = screen.getAllByRole('button', {
      name: /mark done/i,
    });
    const lockedButton = screen.getByRole('button', {
      name: /locked/i,
    });
    expect(markDoneButtons).toHaveLength(1);
    expect(markDoneButtons[0]).toBeEnabled();
    expect(lockedButton).toBeDisabled();

    fireEvent.click(markDoneButtons[0]);

    const updatedButtons = screen.getAllByRole('button', {
      name: /mark done|done/i,
    });
    expect(updatedButtons[1]).toBeEnabled();
  });
});
