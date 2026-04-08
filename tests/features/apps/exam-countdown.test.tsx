import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExamCountdown } from '@/features/apps/components/exam-countdown/exam-countdown';

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('crypto', {
    randomUUID: () => `test-${Math.random().toString(36).slice(2, 10)}`,
  });
});

describe('ExamCountdown', () => {
  it('renders default exams on first visit', () => {
    render(<ExamCountdown />);
    expect(screen.getByDisplayValue('CSE 420')).toBeInTheDocument();
    expect(screen.getByDisplayValue('CSE 211')).toBeInTheDocument();
    expect(screen.getByText('Active Timers')).toBeInTheDocument();
  });

  it('adds a new exam card', () => {
    render(<ExamCountdown />);
    fireEvent.click(screen.getByText(/Add Exam/));
    expect(screen.getByDisplayValue('New Exam')).toBeInTheDocument();
  });

  it('removes an exam card', () => {
    render(<ExamCountdown />);
    expect(screen.getAllByDisplayValue(/CSE/)).toHaveLength(2);
    // Delete buttons are all buttons except the one containing "Add"
    const deleteButtons = screen
      .getAllByRole('button')
      .filter((btn) => !btn.textContent?.includes('Add'));
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByDisplayValue('CSE 420')).not.toBeInTheDocument();
  });

  it('shows empty state when all exams removed', () => {
    render(<ExamCountdown />);
    // Remove first exam
    let deleteButtons = screen
      .getAllByRole('button')
      .filter((btn) => !btn.textContent?.includes('Add'));
    fireEvent.click(deleteButtons[0]);
    // Remove second exam
    deleteButtons = screen
      .getAllByRole('button')
      .filter((btn) => !btn.textContent?.includes('Add'));
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByText(/No Exams Tracked/i)).toBeInTheDocument();
  });

  it('persists exams to localStorage', () => {
    render(<ExamCountdown />);
    const saved = localStorage.getItem('abk_exam_countdown');
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed).toHaveLength(2);
  });

  it('loads exams from localStorage on mount', () => {
    const customExams = [
      {
        id: 'x1',
        course: 'PHY 101',
        title: 'Quiz 5',
        date: new Date(Date.now() + 86400000).toISOString(),
      },
    ];
    localStorage.setItem('abk_exam_countdown', JSON.stringify(customExams));
    render(<ExamCountdown />);
    expect(screen.getByDisplayValue('PHY 101')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Quiz 5')).toBeInTheDocument();
  });

  it('displays countdown labels (Days, Hours, Mins, Secs)', () => {
    render(<ExamCountdown />);
    expect(screen.getAllByText('Days').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Hours').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Mins').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Secs').length).toBeGreaterThanOrEqual(1);
  });

  it('shows "Concluded" for past exams', () => {
    const pastExams = [
      {
        id: 'p1',
        course: 'OLD 101',
        title: 'Past Exam',
        date: '2020-01-01T00:00:00',
      },
    ];
    localStorage.setItem('abk_exam_countdown', JSON.stringify(pastExams));
    render(<ExamCountdown />);
    expect(screen.getByText('Concluded')).toBeInTheDocument();
  });

  it('allows editing course code and title', () => {
    render(<ExamCountdown />);
    const courseInput = screen.getByDisplayValue('CSE 420');
    fireEvent.change(courseInput, { target: { value: 'MAT 215' } });
    expect(screen.getByDisplayValue('MAT 215')).toBeInTheDocument();
  });
});
