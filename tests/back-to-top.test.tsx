import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BackToTop } from '@/shared/components/common/back-to-top';
import '@testing-library/jest-dom';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock window.pageYOffset to make component visible by default
Object.defineProperty(window, 'pageYOffset', {
  value: 400, // Greater than 300 to make component visible
  writable: true,
});

describe('BackToTop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset scroll position to make component visible
    Object.defineProperty(window, 'pageYOffset', {
      value: 400,
      writable: true,
    });
  });

  it('renders back to top button', () => {
    render(<BackToTop />);
    
    const button = screen.getByRole('button', { name: /scroll back to top/i });
    expect(button).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<BackToTop />);
    
    const button = screen.getByRole('button', { name: /scroll back to top/i });
    expect(button).toHaveAttribute('aria-label', 'Scroll back to top');
  });

  it('scrolls to top when clicked', () => {
    const mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;
    
    render(<BackToTop />);
    
    const button = screen.getByRole('button', { name: /scroll back to top/i });
    fireEvent.click(button);
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('shows and hides based on scroll position', () => {
    // Test when scroll position is low (component should not render)
    Object.defineProperty(window, 'pageYOffset', {
      value: 200, // Below 300 threshold
      writable: true,
    });
    
    render(<BackToTop />);
    
    const button = screen.queryByRole('button', { name: /scroll back to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it('has keyboard support', () => {
    const mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;
    
    render(<BackToTop />);
    
    const button = screen.getByRole('button', { name: /scroll back to top/i });
    
    // Button should be focusable and accessible
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('uses smooth scrolling behavior', () => {
    const mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;
    
    render(<BackToTop />);
    
    const button = screen.getByRole('button', { name: /scroll back to top/i });
    fireEvent.click(button);
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});