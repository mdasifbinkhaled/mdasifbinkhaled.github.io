import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GpaCalculator } from '@/features/apps/components/gpa-calculator/gpa-calculator';

describe('GpaCalculator', () => {
  it('renders default 3 courses with grade selectors', () => {
    render(<GpaCalculator />);
    expect(screen.getByText('Semester Courses')).toBeInTheDocument();
    const gradeSelects = screen.getAllByLabelText('Grade');
    expect(gradeSelects).toHaveLength(3);
  });

  it('calculates term GPA from default courses (A=4.0, B+=3.3, A-=3.7)', () => {
    render(<GpaCalculator />);
    // Default: 3cr A(4.0) + 3cr B+(3.3) + 3cr A-(3.7) = (12+9.9+11.1)/9 = 33/9 ≈ 3.67
    expect(screen.getByText('3.67')).toBeInTheDocument();
    expect(screen.getByText(/9 new credits/)).toBeInTheDocument();
  });

  it('updates GPA when grade is changed', () => {
    render(<GpaCalculator />);
    // Change first course from A to F
    const gradeSelects = screen.getAllByLabelText('Grade');
    fireEvent.change(gradeSelects[0], { target: { value: 'F' } });
    // (0 + 9.9 + 11.1) / 9 = 21/9 ≈ 2.33
    expect(screen.getByText('2.33')).toBeInTheDocument();
  });

  it('adds and removes courses', () => {
    render(<GpaCalculator />);
    expect(screen.getAllByLabelText('Grade')).toHaveLength(3);

    fireEvent.click(screen.getByText(/Add Course/));
    expect(screen.getAllByLabelText('Grade')).toHaveLength(4);

    const removeButtons = screen.getAllByLabelText('Remove Course');
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByLabelText('Grade')).toHaveLength(3);
  });

  it('shows empty state when all courses removed', () => {
    render(<GpaCalculator />);
    const removeButtons = screen.getAllByLabelText('Remove Course');
    removeButtons.forEach((btn) => fireEvent.click(btn));
    expect(screen.getByText(/No courses added/i)).toBeInTheDocument();
  });

  it('shows projected CGPA when previous credits and CGPA are set', () => {
    render(<GpaCalculator />);
    // Fill in previous academic standing
    const prevCreditsInput = screen.getByPlaceholderText('e.g. 104');
    const prevCgpaInput = screen.getByPlaceholderText('e.g. 3.45');
    fireEvent.change(prevCreditsInput, { target: { value: '90' } });
    fireEvent.change(prevCgpaInput, { target: { value: '3.50' } });

    // Projected CGPA = (90*3.5 + 33) / (90+9) = (315+33)/99 = 348/99 ≈ 3.52
    expect(screen.getByText('Projected CGPA')).toBeInTheDocument();
    expect(screen.getByText('3.52')).toBeInTheDocument();
    expect(
      screen.getByText(/99 total accumulated credits/)
    ).toBeInTheDocument();
  });

  it('does not show projected CGPA when previous fields are empty', () => {
    render(<GpaCalculator />);
    expect(screen.queryByText('Projected CGPA')).not.toBeInTheDocument();
  });

  it('renders all 11 grade options in each select', () => {
    render(<GpaCalculator />);
    const gradeSelects = screen.getAllByLabelText('Grade');
    const options = gradeSelects[0].querySelectorAll('option');
    expect(options).toHaveLength(11);
    expect(options[0].textContent).toContain('A');
    expect(options[10].textContent).toContain('F');
  });
});
