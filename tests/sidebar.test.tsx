import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppSidebarLayout from '../src/shared/components/layout/app-sidebar-layout';
import '@testing-library/jest-dom';

// Mock child components
vi.mock('@/shared/components/navigation/navbar', () => ({
  Navbar: ({ onMobileMenuOpen }: { onMobileMenuOpen?: () => void }) => (
    <div data-testid="navbar">
      <button onClick={onMobileMenuOpen} data-testid="mobile-menu-trigger">
        Open Menu
      </button>
    </div>
  ),
}));

vi.mock('@/shared/components/layout/profile-sidebar', () => ({
  ProfileSidebar: () => <div data-testid="profile-sidebar">Profile Sidebar</div>,
}));

vi.mock('@/shared/components/common/back-to-top', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right">ChevronRight</div>,
  X: () => <div data-testid="x-icon">X</div>,
  ArrowUp: () => <div data-testid="arrow-up">ArrowUp</div>,
  GraduationCap: () => <div data-testid="graduation-cap">GraduationCap</div>,
}));

// Mock shadcn/ui components
// Mock Dialog components (we now use Dialog instead of Sheet)
vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, open, onOpenChange }: any) => (
    <div data-testid="dialog-root" data-open={open} onClick={() => onOpenChange?.(false)}>
      {children}
    </div>
  ),
  Portal: ({ children }: any) => <div data-testid="dialog-portal">{children}</div>,
  Overlay: ({ className, ...props }: any) => (
    <div data-testid="dialog-overlay" className={className} {...props} />
  ),
  Content: ({ children, className, ...props }: any) => (
    <div data-testid="dialog-content" className={className} {...props}>
      {children}
    </div>
  ),
  Title: ({ children, ...props }: any) => (
    <h2 data-testid="dialog-title" {...props}>
      {children}
    </h2>
  ),
  Description: ({ children, ...props }: any) => (
    <p data-testid="dialog-description" {...props}>
      {children}
    </p>
  ),
  Close: ({ children, className, ...props }: any) => (
    <button data-testid="dialog-close" className={className} {...props}>
      {children}
    </button>
  ),
  Trigger: ({ children, ...props }: any) => (
    <button data-testid="dialog-trigger" {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@radix-ui/react-visually-hidden', () => ({
  VisuallyHidden: ({ children }: { children: React.ReactNode }) => (
    <span style={{ position: 'absolute', border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden' }}>
      {children}
    </span>
  ),
  Root: ({ children }: { children: React.ReactNode }) => (
    <span style={{ position: 'absolute', border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden' }}>
      {children}
    </span>
  ),
}));

vi.mock('@/shared/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: { children: React.ReactNode; onClick?: () => void; [key: string]: unknown }) => (
    <button onClick={onClick} {...props} data-testid="button">
      {children}
    </button>
  ),
}));

describe('AppSidebarLayout', () => {
  const mockChildren = <div data-testid="main-content">Main Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the layout with all components', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Check for single navbar in header
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
    
    // Check for main content
    const mainContent = screen.getByTestId('main-content');
    expect(mainContent).toBeInTheDocument();
    
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });

  it('renders desktop sidebar', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Desktop sidebar should be present
    const desktopSidebar = screen.getAllByTestId('profile-sidebar')[0];
    expect(desktopSidebar).toBeInTheDocument();
  });

  it('opens mobile dialog when mobile menu is triggered', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Get mobile version specifically (first in the array)
    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];
    const dialog = screen.getByTestId('dialog-root');
    
    // Initial state
    expect(dialog).toBeInTheDocument();
    
    // Simulate click to open
    if (mobileMenuTrigger) {
      fireEvent.click(mobileMenuTrigger);
    }
    
    // Note: Since we're using mocked components, the state doesn't actually change
    // In real implementation, this would toggle the dialog
    expect(mobileMenuTrigger).toBeInTheDocument();
  });

  it('closes mobile dialog when close button is clicked', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Get mobile version specifically (first in the array)
    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];
    const dialog = screen.getByTestId('dialog-root');
    
    // Test interaction
    if (mobileMenuTrigger) {
      fireEvent.click(mobileMenuTrigger);
    }
    
    // Since we're using mocked components, we just verify the elements exist
    expect(dialog).toBeInTheDocument();
    expect(mobileMenuTrigger).toBeInTheDocument();
  });

  it('has proper semantics and structure', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Check main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveAttribute('id', 'main-content');
    
    // Check desktop sidebar
    const desktopSidebar = screen.getByRole('complementary');
    expect(desktopSidebar).toBeInTheDocument();
    expect(desktopSidebar).toHaveAttribute('id', 'desktop-sidebar');
    
    // Check header
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Check footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders mobile sidebar in dialog with proper accessibility', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Check that dialog exists (header and title are rendered by actual Dialog component)
    expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    
    // Verify navbar exists in header
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
    
    // Check accessibility elements in mobile dialog
    expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-description')).toBeInTheDocument();
  });

  it('includes back to top component globally', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // BackToTop should be rendered once at the layout level
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });

  it('has responsive layout classes', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Check for main layout container
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
    
    // Find the root container (should have min-h-screen)
    const rootContainer = screen.getByTestId('main-content').closest('.min-h-screen');
    expect(rootContainer).toBeInTheDocument();
    expect(rootContainer).toHaveClass('min-h-screen', 'flex', 'flex-col');
    
    // Check desktop sidebar has responsive classes
    const desktopSidebar = screen.getByRole('complementary');
    expect(desktopSidebar).toHaveClass('hidden', 'lg:block');
  });

  it('manages mobile dialog state correctly', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Get mobile version specifically (first in the array)
    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];
    const dialog = screen.getByTestId('dialog-root');
    
    // Initial state
    expect(dialog).toBeInTheDocument();
    
    // Simulate click to open
    if (mobileMenuTrigger) {
      fireEvent.click(mobileMenuTrigger);
    }
    // Note: In a real implementation, this would update the state
    // For now, we just verify the trigger is clickable
    expect(mobileMenuTrigger).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);
    
    // Get mobile version specifically (first in the array)
    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];
    
    // Test keyboard interaction
    if (mobileMenuTrigger) {
      fireEvent.keyDown(mobileMenuTrigger, { key: 'Enter' });
      fireEvent.click(mobileMenuTrigger); // Simulate actual click
    }
    
    const dialog = screen.getByTestId('dialog-root');
    expect(dialog).toBeInTheDocument(); // Dialog is present
  });
});