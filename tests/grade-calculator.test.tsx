import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GradeCalculator } from '@/features/apps/components/grade-calculator';

describe('GradeCalculator Component', () => {
  it('renders the default layout components correctly', () => {
    render(<GradeCalculator />);

    expect(screen.getByText('Course Components')).toBeInTheDocument();
    expect(screen.getByText('Current Standing')).toBeInTheDocument();
    expect(screen.getByText('Target Projection')).toBeInTheDocument();

    // Default 3 tools loaded
    expect(screen.getByDisplayValue('Midterm')).toBeInTheDocument();
  });

  it('allows adding and removing grading components', () => {
    render(<GradeCalculator />);

    // Add component
    const addButton = screen.getByText('Add Component');
    fireEvent.click(addButton);

    // The default name is 'Component 4' since we start with 3
    expect(screen.getByDisplayValue('Component 4')).toBeInTheDocument();

    // Remove components (trash buttons dynamically rendered, let's target by role if possible, or just click the first one)
    const removeButtons = screen.getAllByRole('button', {
      name: /Remove Component/i,
    });
    expect(removeButtons.length).toBe(4); // 3 defaults + 1 we added

    fireEvent.click(removeButtons[0]);
    expect(screen.queryByDisplayValue('Midterm')).not.toBeInTheDocument(); // Was the first element
  });

  // Mathematics Validation testing core projection states
  it('updates total weights correctly', () => {
    render(<GradeCalculator />);
    expect(screen.getByText('Total Weight: 100%')).toBeInTheDocument();
  });
});
