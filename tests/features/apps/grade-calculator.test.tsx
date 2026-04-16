import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GradeCalculator } from '@/features/apps';

beforeEach(() => {
  localStorage.clear();
});

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

  it('calculates weighted percentage when scores are entered', () => {
    render(<GradeCalculator />);
    // Default: Midterm(30%), Final(40%), Assignments(30%) — all score=0, maxScore=100
    // All 3 components have maxScore>0 so all contribute to totalPossiblePoints=100
    // Set Midterm score to 80/100 (weight 30%)
    const scoreInputs = screen.getAllByLabelText(/^Score for/);
    fireEvent.change(scoreInputs[0], { target: { value: '80' } });

    // currentPoints = (80/100)*30 = 24, totalPossiblePoints = 100
    // currentPercentage = (24/100)*100 = 24.0%
    expect(screen.getByText('24.0%')).toBeInTheDocument();
    expect(screen.getByText('24.0')).toBeInTheDocument(); // Points Earned
  });

  it('maps percentage to correct letter grade', () => {
    render(<GradeCalculator />);
    // Set all scores to 85/100 → 85% → A- (min 85%)
    const scoreInputs = screen.getAllByLabelText(/^Score for/);
    scoreInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: '85' } });
    });
    expect(screen.getByText('85.0%')).toBeInTheDocument();
    // Current grade display: "Current Calculated Grade: A-"
    expect(screen.getByText(/Current Calculated Grade/)).toHaveTextContent(
      'A-'
    );
  });

  it('shows "Secured" when target already met', () => {
    render(<GradeCalculator />);
    // Make Midterm weight=90 (score 100/100), set others weight=0
    // so pPoints=90, currentPoints=90, weightRemaining=10
    // For target A (90%): pointsRemaining=0, requiredAverage=0% → Secured
    const weightInputs = screen.getAllByLabelText(/^Weight percentage for/);
    const scoreInputs = screen.getAllByLabelText(/^Score for/);
    fireEvent.change(weightInputs[0], { target: { value: '90' } });
    fireEvent.change(scoreInputs[0], { target: { value: '100' } });
    fireEvent.change(weightInputs[1], { target: { value: '0' } });
    fireEvent.change(weightInputs[2], { target: { value: '0' } });
    expect(screen.getByText(/Secured/)).toBeInTheDocument();
  });

  it('disables remove button when only 1 component remains', () => {
    render(<GradeCalculator />);
    const removeButtons = screen.getAllByRole('button', {
      name: /Remove component/i,
    });
    // Remove 2 of 3
    fireEvent.click(removeButtons[0]);
    fireEvent.click(
      screen.getAllByRole('button', { name: /Remove component/i })[0]
    );
    // Only 1 left, button should be disabled
    const lastRemove = screen.getByRole('button', {
      name: /Remove component/i,
    });
    expect(lastRemove).toBeDisabled();
  });
});
