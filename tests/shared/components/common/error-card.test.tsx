import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorCard } from '@/shared/components/infra/error-card';

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

describe('ErrorCard', () => {
  const mockError = new Error('Something broke');
  const mockReset = vi.fn();

  it('renders simple layout when fullUI is false', () => {
    render(
      <ErrorCard
        error={mockError}
        reset={mockReset}
        section="About page"
        fullUI={false}
      />
    );
    expect(
      screen.getByText(/Something went wrong on the About page/)
    ).toBeInTheDocument();
    expect(screen.getByText('Something broke')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('renders full card UI by default', () => {
    render(<ErrorCard error={mockError} reset={mockReset} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an unexpected error/)
    ).toBeInTheDocument();
  });

  it('calls reset when "Try again" is clicked', () => {
    render(<ErrorCard error={mockError} reset={mockReset} fullUI={false} />);
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockReset).toHaveBeenCalled();
  });

  it('renders onReload button when provided', () => {
    const onReload = vi.fn();
    render(
      <ErrorCard error={mockError} reset={mockReset} onReload={onReload} />
    );
    fireEvent.click(screen.getByRole('button', { name: /reload page/i }));
    expect(onReload).toHaveBeenCalled();
  });

  it('always renders homepage link', () => {
    render(<ErrorCard />);
    expect(
      screen.getByRole('link', { name: /go to homepage/i })
    ).toHaveAttribute('href', '/');
  });

  it('omits Try again when no reset provided', () => {
    render(<ErrorCard fullUI={false} />);
    expect(
      screen.queryByRole('button', { name: /try again/i })
    ).not.toBeInTheDocument();
  });

  it('omits error message when no error provided in simple layout', () => {
    render(<ErrorCard fullUI={false} />);
    expect(screen.queryByText('Something broke')).not.toBeInTheDocument();
  });
});
