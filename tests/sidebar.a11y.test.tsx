import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout';
import { AppProviders } from '@/shared/providers/app-providers';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left-icon">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right-icon">ChevronRight</div>,
  ArrowUp: () => <div data-testid="arrow-up-icon">ArrowUp</div>,
  GraduationCap: () => (
    <div data-testid="graduation-cap-icon">GraduationCap</div>
  ),
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  Sun: () => <div data-testid="sun-icon">Sun</div>,
  Moon: () => <div data-testid="moon-icon">Moon</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Home: () => <div data-testid="home-icon">Home</div>,
  UserCircle: () => <div data-testid="user-circle-icon">UserCircle</div>,
  Cpu: () => <div data-testid="cpu-icon">Cpu</div>,
  BookOpenText: () => <div data-testid="book-open-text-icon">BookOpenText</div>,
  Presentation: () => <div data-testid="presentation-icon">Presentation</div>,
  Send: () => <div data-testid="send-icon">Send</div>,
  LayoutDashboard: () => (
    <div data-testid="layout-dashboard-icon">LayoutDashboard</div>
  ),
  Building2: () => <div data-testid="building-2-icon">Building2</div>,
  Code2: () => <div data-testid="code-2-icon">Code2</div>,
  Server: () => <div data-testid="server-icon">Server</div>,
  Calculator: () => <div data-testid="calculator-icon">Calculator</div>,
  Database: () => <div data-testid="database-icon">Database</div>,
  Brain: () => <div data-testid="brain-icon">Brain</div>,
  Laptop: () => <div data-testid="laptop-icon">Laptop</div>,
  BookOpen: () => <div data-testid="book-open-icon">BookOpen</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  Rss: () => <div data-testid="rss-icon">Rss</div>,
  Monitor: () => <div data-testid="monitor-icon">Monitor</div>,
  Waves: () => <div data-testid="waves-icon">Waves</div>,
  Palette: () => <div data-testid="palette-icon">Palette</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
  Coffee: () => <div data-testid="coffee-icon">Coffee</div>,
  Trees: () => <div data-testid="trees-icon">Trees</div>,
  CloudMoon: () => <div data-testid="cloud-moon-icon">CloudMoon</div>,
  Sunrise: () => <div data-testid="sunrise-icon">Sunrise</div>,
  Flower: () => <div data-testid="flower-icon">Flower</div>,
  Briefcase: () => <div data-testid="briefcase-icon">Briefcase</div>,
  Heart: () => <div data-testid="heart-icon">Heart</div>,
  Leaf: () => <div data-testid="leaf-icon">Leaf</div>,
  Sparkles: () => <div data-testid="sparkles-icon">Sparkles</div>,
  Scroll: () => <div data-testid="scroll-icon">Scroll</div>,
  FileText: () => <div data-testid="file-text-icon">FileText</div>,
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  Github: () => <div data-testid="github-icon">Github</div>,
  Linkedin: () => <div data-testid="linkedin-icon">Linkedin</div>,
  BookUser: () => <div data-testid="book-user-icon">BookUser</div>,
  Smartphone: () => <div data-testid="smartphone-icon">Smartphone</div>,
  User: () => <div data-testid="user-icon">User</div>,
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  Award: () => <div data-testid="award-icon">Award</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
}));

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}

test('mobile sheet is labeled', async () => {
  render(
    <TestWrapper>
      <AppSidebarLayout>
        <div>content</div>
      </AppSidebarLayout>
    </TestWrapper>
  );

  const user = userEvent.setup();

  // Test that the menu button has proper accessibility attributes
  const btn = screen.getByRole('button', { name: /menu|open navigation/i });
  expect(btn).toHaveAttribute('aria-controls', 'mobile-nav');
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  // Radix UI natively sets the expanded attribute on the trigger.
  // The label is 'Open Menu' due to our Navbar trigger mock.

  // Actually click it to mount the dialog internally
  await user.click(btn);

  // Test that the SheetTitle is rendered with proper text
  const title = await screen.findByText('Navigation menu');
  expect(title).toBeInTheDocument();
});
