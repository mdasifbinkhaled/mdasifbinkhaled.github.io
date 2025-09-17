import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '@/shared/components/common/skip-link';

describe('SkipLink', () => {
  it('renders skip link with correct attributes', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveAttribute('tabIndex', '1');
  });

  it('has proper accessibility classes', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toHaveClass('absolute', 'focus:translate-y-0');
  });
});
