import { render, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import { Navbar } from '@/shared/components/navigation/navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/about/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
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
}));

test('active link has aria-current', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
    'aria-current',
    'page'
  );
});
