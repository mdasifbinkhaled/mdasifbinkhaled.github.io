import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  ErrorFallback,
  createErrorBoundary,
} from '@/shared/components/infra/error-fallback';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ErrorFallback', () => {
  const mockError = Object.assign(new Error('Test error'), { digest: 'abc' });
  const mockReset = vi.fn();

  it('renders with section name in simple mode', () => {
    render(
      <ErrorFallback
        error={mockError}
        reset={mockReset}
        section="Contact page"
        fullUI={false}
      />
    );
    expect(
      screen.getByText(/Something went wrong on the Contact page/)
    ).toBeInTheDocument();
  });

  it('logs the error to console on mount', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorFallback error={mockError} reset={mockReset} section="Research" />
    );
    expect(consoleSpy).toHaveBeenCalledWith('Research Error', mockError);
    consoleSpy.mockRestore();
  });

  it('renders full UI by default', () => {
    render(<ErrorFallback error={mockError} reset={mockReset} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('createErrorBoundary', () => {
  it('creates a component that renders ErrorFallback for a section', () => {
    const BlogError = createErrorBoundary('Blog page');
    const mockError = Object.assign(new Error('Blog broke'), {
      digest: 'xyz',
    });
    render(<BlogError error={mockError} reset={vi.fn()} />);
    expect(
      screen.getByText(/Something went wrong on the Blog page/)
    ).toBeInTheDocument();
  });
});
