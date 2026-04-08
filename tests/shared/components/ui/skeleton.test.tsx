import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from '@/shared/components/ui/skeleton';

describe('Skeleton', () => {
  it('renders with base classes', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('animate-pulse');
    expect(el).toHaveClass('rounded-md');
    expect(el).toHaveClass('bg-muted');
  });

  it('merges custom className', () => {
    const { container } = render(<Skeleton className="h-8 w-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('h-8');
    expect(el).toHaveClass('w-full');
    expect(el).toHaveClass('animate-pulse');
  });

  it('passes through HTML attributes', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" role="status" />
    );
    expect(container.querySelector('[data-testid="skeleton"]')).toBeTruthy();
    expect(container.querySelector('[role="status"]')).toBeTruthy();
  });
});
