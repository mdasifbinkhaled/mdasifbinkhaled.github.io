// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  StatsPanel,
  type StatItem,
} from '@/shared/components/common/stats-panel';

const items: StatItem[] = [
  { label: 'Students', value: 42 },
  { label: 'Rooms', value: 3, hint: '120 seats' },
  { label: 'Assigned', value: '41', tone: 'success' },
];

describe('<StatsPanel>', () => {
  it('renders the given title and every label', () => {
    render(<StatsPanel items={items} title="Seat Planner" />);
    expect(screen.getByText('Seat Planner')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Rooms')).toBeInTheDocument();
    expect(screen.getByText('Assigned')).toBeInTheDocument();
    expect(screen.getByText('120 seats')).toBeInTheDocument();
  });

  it('applies success tone class', () => {
    const { container } = render(<StatsPanel items={items} title="X" />);
    expect(container.querySelector('.text-emerald-600')).not.toBeNull();
  });

  it('renders horizontally without a heading text node', () => {
    const { container } = render(
      <StatsPanel items={items} orientation="horizontal" />
    );
    // horizontal mode uses aria-label, not a visible <h3>
    expect(container.querySelector('h3')).toBeNull();
    expect(screen.getByText('Students')).toBeInTheDocument();
  });

  it('renders nothing when items is empty', () => {
    const { container } = render(<StatsPanel items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
