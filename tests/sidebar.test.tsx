import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
  ProfileSidebar: () => (
    <div data-testid="profile-sidebar">Profile Sidebar</div>
  ),
}));

vi.mock('@/shared/components/common/back-to-top', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right">ChevronRight</div>,
  X: () => <div data-testid="x-icon">X</div>,
  ArrowUp: () => <div data-testid="arrow-up">ArrowUp</div>,
  GraduationCap: () => <div data-testid="graduation-cap">GraduationCap</div>,
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

  it('opens mobile dialog when mobile menu is triggered', async () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);

    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];

    // Initial state: dialog should not be rendered natively
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    if (mobileMenuTrigger) {
      fireEvent.click(mobileMenuTrigger);
    }

    // Wait for native Radix portal to mount and render
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('closes mobile dialog when close button is clicked', async () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);

    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];

    // Open first
    if (mobileMenuTrigger) {
      fireEvent.click(mobileMenuTrigger);
    }

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Close
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    // Dialog unmounts asynchronously
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
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

  it('renders mobile sidebar in dialog with proper accessibility', async () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);

    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    if (mobileMenuTriggers[0]) {
      fireEvent.click(mobileMenuTriggers[0]);
    }

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Verify properties
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
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
    const rootContainer = screen
      .getByTestId('main-content')
      .closest('.min-h-screen');
    expect(rootContainer).toBeInTheDocument();
    expect(rootContainer).toHaveClass(
      'min-h-screen',
      'w-full',
      'overflow-x-hidden'
    );

    // Check desktop sidebar has responsive classes
    const desktopSidebar = screen.getByRole('complementary');
    expect(desktopSidebar).toHaveClass('hidden', 'lg:flex');
  });

  it('manages mobile dialog state correctly', async () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);

    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    if (mobileMenuTrigger) {
      fireEvent.click(mobileMenuTrigger);
    }

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    render(<AppSidebarLayout>{mockChildren}</AppSidebarLayout>);

    const mobileMenuTriggers = screen.getAllByTestId('mobile-menu-trigger');
    const mobileMenuTrigger = mobileMenuTriggers[0];

    if (mobileMenuTrigger) {
      fireEvent.keyDown(mobileMenuTrigger, { key: 'Enter' });
      fireEvent.click(mobileMenuTrigger);
    }

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});
