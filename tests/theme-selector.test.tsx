import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeSelector } from '../src/shared/components/ui/theme-selector';
import { AppProviders } from '../src/shared/providers/app-providers';

// Mock next-themes module
vi.mock('next-themes', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useTheme: () => ({
      theme: 'light',
      setTheme: vi.fn(),
      themes: ['light', 'dark'],
    }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="theme-provider">{children}</div>
    ),
  };
});

// Wrapper component with theme provider
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProviders>{children}</AppProviders>
);

describe('ThemeSelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render default variant with theme button', () => {
    render(
      <ThemeWrapper>
        <ThemeSelector />
      </ThemeWrapper>
    );

    const themeButton = screen.getByRole('button');
    expect(themeButton).toBeInTheDocument();
    expect(themeButton).toHaveTextContent('Light');
  });

  it('should render compact variant', () => {
    render(
      <ThemeWrapper>
        <ThemeSelector variant="compact" />
      </ThemeWrapper>
    );

    const themeButton = screen.getByRole('button');
    expect(themeButton).toBeInTheDocument();
    // For compact variant, it uses sr-only text instead of aria-label
    expect(screen.getByText('Change theme')).toBeInTheDocument();
  });

  it('should render floating variant with fixed positioning', () => {
    render(
      <ThemeWrapper>
        <ThemeSelector variant="floating" />
      </ThemeWrapper>
    );

    const floatingButton = screen.getByRole('button');
    expect(floatingButton).toBeInTheDocument();
    expect(floatingButton).toHaveClass('fixed');
  });

  it('should open dropdown menu when clicked', async () => {
    const user = userEvent.setup();

    render(
      <ThemeWrapper>
        <ThemeSelector variant="compact" />
      </ThemeWrapper>
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('should show theme options in dropdown', async () => {
    const user = userEvent.setup();

    render(
      <ThemeWrapper>
        <ThemeSelector variant="compact" />
      </ThemeWrapper>
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', () => {
    render(
      <ThemeWrapper>
        <ThemeSelector variant="compact" />
      </ThemeWrapper>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    const srOnlyText = screen.getByText('Change theme');
    expect(srOnlyText).toHaveClass('sr-only');
  });

  it('should be keyboard navigable', async () => {
    const user = userEvent.setup();

    render(
      <ThemeWrapper>
        <ThemeSelector variant="compact" />
      </ThemeWrapper>
    );

    const trigger = screen.getByRole('button');
    await user.tab();
    expect(trigger).toHaveFocus();

    // Open menu with Enter
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('should hide label when showLabel is false', () => {
    render(
      <ThemeWrapper>
        <ThemeSelector showLabel={false} />
      </ThemeWrapper>
    );

    // The label should be hidden or empty
    const button = screen.getByRole('button');
    expect(button).not.toHaveTextContent('Light');
  });
});
