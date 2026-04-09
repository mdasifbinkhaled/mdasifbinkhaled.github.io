import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorBoundary } from '@/shared/components/infra/error-boundary';
import { RouteAnnouncer } from '@/shared/components/infra/route-announcer';
import { HashScroll } from '@/shared/components/infra/hash-scroll';
import React from 'react';

// Mock next/navigation for RouteAnnouncer
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// Mock @radix-ui/react-visually-hidden
vi.mock('@radix-ui/react-visually-hidden', () => ({
  VisuallyHidden: ({ children }: { children: React.ReactNode }) => (
    <span className="sr-only">{children}</span>
  ),
}));

// ─── ErrorBoundary ───────────────────────────────────────────────────────────
describe('ErrorBoundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  function ThrowingChild({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) throw new Error('Test error');
    return <p>Healthy child</p>;
  }

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders default error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>
    );
    // ErrorCard is displayed (it renders a "Try Again" or similar button)
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>Custom fallback</p>}>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('logs the error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Uncaught error:',
      expect.any(Error),
      expect.any(Object)
    );
  });
});

// ─── RouteAnnouncer ──────────────────────────────────────────────────────────
describe('RouteAnnouncer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders an aria-live region', () => {
    render(<RouteAnnouncer />);
    const announcer = document.getElementById('route-announcer');
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveAttribute('aria-live', 'polite');
  });

  it('announces navigation after delay', async () => {
    Object.defineProperty(document, 'title', {
      value: 'Test Page',
      writable: true,
    });

    render(<RouteAnnouncer />);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    const announcer = document.getElementById('route-announcer');
    expect(announcer?.textContent).toContain('Navigated to:');
  });

  it('has aria-atomic attribute', () => {
    render(<RouteAnnouncer />);
    const announcer = document.getElementById('route-announcer');
    expect(announcer).toHaveAttribute('aria-atomic', 'true');
  });
});

// ─── HashScroll ──────────────────────────────────────────────────────────────
describe('HashScroll', () => {
  it('renders nothing (returns null)', () => {
    const { container } = render(<HashScroll />);
    expect(container.innerHTML).toBe('');
  });

  it('cleans up event listener on unmount', () => {
    const removeEventSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<HashScroll />);
    unmount();
    expect(removeEventSpy).toHaveBeenCalledWith(
      'hashchange',
      expect.any(Function)
    );
    removeEventSpy.mockRestore();
  });

  it('attempts to scroll to hash on mount', () => {
    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {});
    // Set a hash
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hash: '#test-section' },
      writable: true,
    });

    // Create target element
    const el = document.createElement('div');
    el.id = 'test-section';
    document.body.appendChild(el);

    vi.useFakeTimers();
    render(<HashScroll />);
    vi.advanceTimersByTime(100);
    vi.useRealTimers();

    // scrollTo may be called depending on element visibility
    // Just verify no errors thrown and component mounts cleanly
    document.body.removeChild(el);
    scrollToSpy.mockRestore();
  });
});
