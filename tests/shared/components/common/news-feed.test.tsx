import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NewsFeed } from '@/features/home';

const mockItems = [
  {
    id: '1',
    date: '2024-03-15',
    text: 'First news item ',
    highlight: 'highlighted!',
  },
  {
    id: '2',
    date: '2024-02-10',
    text: 'Second item ',
    description: 'with extra detail',
  },
  {
    id: '3',
    date: 'Upcoming',
    text: 'No parseable date item',
  },
];

describe('NewsFeed', () => {
  it('renders all news items', () => {
    render(<NewsFeed items={mockItems} />);
    expect(screen.getByText(/First news item/)).toBeInTheDocument();
    expect(screen.getByText(/Second item/)).toBeInTheDocument();
    expect(screen.getByText(/No parseable date item/)).toBeInTheDocument();
  });

  it('renders highlight spans when present', () => {
    render(<NewsFeed items={mockItems} />);
    expect(screen.getByText('highlighted!')).toBeInTheDocument();
  });

  it('renders description when present', () => {
    render(<NewsFeed items={mockItems} />);
    expect(screen.getByText('with extra detail')).toBeInTheDocument();
  });

  it('renders date as time element with ISO dateTime for valid dates', () => {
    render(<NewsFeed items={mockItems} />);
    const timeElements = screen.getAllByText('2024-03-15');
    expect(timeElements[0].closest('time')).toHaveAttribute('dateTime');
  });

  it('handles non-parseable dates gracefully', () => {
    render(<NewsFeed items={mockItems} />);
    const upcomingTime = screen.getByText('Upcoming');
    expect(upcomingTime.closest('time')).not.toHaveAttribute('dateTime');
  });

  it('applies custom className', () => {
    const { container } = render(
      <NewsFeed items={mockItems} className="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('renders empty when no items provided', () => {
    const { container } = render(<NewsFeed items={[]} />);
    expect(container.querySelector('article')).not.toBeInTheDocument();
  });
});
