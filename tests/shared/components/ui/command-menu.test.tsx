import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CommandMenu } from '@/shared/components/ui/command-menu';
import { portfolioEvents } from '@/shared/lib/analytics';

const push = vi.fn();
const setTheme = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme,
  }),
}));

vi.mock('@/shared/lib/analytics', () => ({
  portfolioEvents: {
    publicationsFilter: vi.fn(),
    commandPaletteSearch: vi.fn(),
    commandPaletteSelect: vi.fn(),
  },
  academicEvents: {
    viewPublication: vi.fn(),
    downloadPublication: vi.fn(),
    viewCV: vi.fn(),
    downloadCV: vi.fn(),
  },
}));

describe('CommandMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tracks command selection when an action is chosen', () => {
    render(<CommandMenu />);

    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    fireEvent.click(screen.getByText('Browse Publications'));

    expect(push).toHaveBeenCalledWith('/publications');
    expect(portfolioEvents.commandPaletteSelect).toHaveBeenCalledWith(
      'Publications',
      0
    );
  });

  it('tracks search usage after debounce', async () => {
    render(<CommandMenu />);

    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    fireEvent.change(
      screen.getByPlaceholderText(/search pages, courses, actions/i),
      {
        target: { value: 'pub' },
      }
    );

    await vi.waitFor(() => {
      expect(portfolioEvents.commandPaletteSearch).toHaveBeenCalledWith(3);
    });
  });
});
