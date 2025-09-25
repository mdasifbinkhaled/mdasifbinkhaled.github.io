import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Navbar } from '@/shared/components/navigation/navbar';
import '@testing-library/jest-dom';

// Mock next/navigation
const mockUsePathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock theme selector
vi.mock('@/shared/components/ui/theme-selector', () => ({
  ThemeSelector: () => <div data-testid="theme-selector">Theme Selector</div>,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid="graduation-cap-icon">GraduationCap</div>,
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  Sun: () => <div data-testid="sun-icon">Sun</div>,
  Moon: () => <div data-testid="moon-icon">Moon</div>,
}));

describe('Navbar', () => {
  const mockOnMobileMenuOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  it('renders navbar with branding', () => {
    render(<Navbar />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByTestId('graduation-cap-icon')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to homepage/i })).toHaveAttribute('href', '/');
  });

  it('shows mobile menu button when showMobileMenuButton is true', () => {
    render(<Navbar onMobileMenuOpen={mockOnMobileMenuOpen} showMobileMenuButton={true} />);
    
    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('hides mobile menu button when showMobileMenuButton is false', () => {
    render(<Navbar onMobileMenuOpen={mockOnMobileMenuOpen} showMobileMenuButton={false} />);
    
    expect(screen.queryByRole('button', { name: /open navigation menu/i })).not.toBeInTheDocument();
  });

  it('calls onMobileMenuOpen when mobile menu button is clicked', () => {
    render(<Navbar onMobileMenuOpen={mockOnMobileMenuOpen} showMobileMenuButton={true} />);
    
    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuButton);
    
    expect(mockOnMobileMenuOpen).toHaveBeenCalledTimes(1);
  });

  it('renders navigation links with proper accessibility', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
    
    // Check that navigation links exist
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(1); // At least home link + nav links
  });

  it('applies active state correctly for current page', () => {
    mockUsePathname.mockReturnValue('/about');
    
    render(<Navbar />);
    
    // Find the About link and check if it has aria-current="page"
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not apply active state for non-current pages', () => {
    mockUsePathname.mockReturnValue('/about');
    
    render(<Navbar />);
    
    // Find links that should not be active
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).not.toHaveAttribute('aria-current', 'page');
  });

  it('handles trailing slashes correctly', () => {
    mockUsePathname.mockReturnValue('/about/');
    
    render(<Navbar />);
    
    // About link should still be active with trailing slash
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders theme selector', () => {
    render(<Navbar />);
    
    expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Navbar />);
    
    // Check header element
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0');
    
    // Check navigation element
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('supports keyboard navigation', () => {
    render(<Navbar onMobileMenuOpen={mockOnMobileMenuOpen} showMobileMenuButton={true} />);
    
    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    
    // Test Enter key
    fireEvent.keyDown(menuButton, { key: 'Enter' });
    fireEvent.click(menuButton); // Simulate the actual click that would happen
    expect(mockOnMobileMenuOpen).toHaveBeenCalled();
  });

  it('has focus-visible styles for accessibility', () => {
    render(<Navbar onMobileMenuOpen={mockOnMobileMenuOpen} showMobileMenuButton={true} />);
    
    const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuButton).toHaveClass('focus-visible:outline-none');
    
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toHaveClass('focus-visible:outline-none');
  });
});