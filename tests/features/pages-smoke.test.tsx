/**
 * Smoke render tests for feature modules.
 *
 * These tests verify that page-level components render without crashing,
 * catching import errors, type mismatches, and runtime exceptions early.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppProviders } from '@/shared/providers/app-providers';

// ── Mocks ────────────────────────────────────────────────────────────

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  const MockIcon = () => null;
  return new Proxy(actual, {
    get: (target, prop) => {
      if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
        return MockIcon;
      }
      return Reflect.get(target, prop);
    },
  });
});

const renderWithProviders = (ui: React.ReactElement) =>
  render(<AppProviders>{ui}</AppProviders>);

// ── About Feature ────────────────────────────────────────────────────

describe('About feature components', () => {
  it('renders HeroSection without crashing', async () => {
    const { HeroSection } =
      await import('@/features/about/components/hero-section');
    renderWithProviders(<HeroSection />);
    expect(document.body).toBeTruthy();
  });

  it('renders SkillsSection with skill categories', async () => {
    const { SkillsSection } =
      await import('@/features/about/components/skills-section');
    renderWithProviders(<SkillsSection />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Programming & Frameworks')).toBeInTheDocument();
  });

  it('renders AwardsSection without crashing', async () => {
    const { AwardsSection } =
      await import('@/features/about/components/awards-section');
    renderWithProviders(<AwardsSection />);
    expect(document.body).toBeTruthy();
  });

  it('renders CertificationsSection without crashing', async () => {
    const { CertificationsSection } =
      await import('@/features/about/components/certifications-section');
    renderWithProviders(<CertificationsSection />);
    expect(document.body).toBeTruthy();
  });
});

// ── Home Feature ─────────────────────────────────────────────────────

describe('Home feature components', () => {
  it('renders HeroSection with author name', async () => {
    const { HeroSection } =
      await import('@/features/home/components/hero-section');
    renderWithProviders(<HeroSection />);
    expect(screen.getByText('Md Asif Bin Khaled')).toBeInTheDocument();
  });

  it('renders ConnectSection without crashing', async () => {
    const { ConnectSection } =
      await import('@/features/home/components/connect-section');
    renderWithProviders(<ConnectSection />);
    expect(screen.getByText(/connect & collaborate/i)).toBeInTheDocument();
  });

  it('renders ResearchHighlights without crashing', async () => {
    const { ResearchHighlights } =
      await import('@/features/home/components/research-highlights');
    renderWithProviders(<ResearchHighlights />);
    expect(document.body).toBeTruthy();
  });
});

// ── Research Feature ─────────────────────────────────────────────────

describe('Research feature components', () => {
  it('renders ResearchHero without crashing', async () => {
    const { ResearchHero } =
      await import('@/features/research/components/research-hero');
    renderWithProviders(<ResearchHero />);
    expect(document.body).toBeTruthy();
  });

  it('renders PrimaryAreas with research areas', async () => {
    const { PrimaryAreas } =
      await import('@/features/research/components/primary-areas');
    renderWithProviders(<PrimaryAreas />);
    expect(document.body).toBeTruthy();
  });

  it('renders OpenSource section without crashing', async () => {
    const { OpenSource } =
      await import('@/features/research/components/open-source');
    renderWithProviders(<OpenSource />);
    expect(document.body).toBeTruthy();
  });
});

// ── Publications Feature ─────────────────────────────────────────────

describe('Publications feature components', () => {
  it('renders PublicationList with publications data', async () => {
    const { PublicationList } =
      await import('@/shared/components/common/publication-list');
    const { samplePublications } =
      await import('@/shared/lib/data/publications');
    renderWithProviders(
      <PublicationList initialPublications={samplePublications} />
    );
    // Should render at least one publication title
    expect(screen.getByPlaceholderText(/filter by title/i)).toBeInTheDocument();
  });

  it('renders AcademicProfiles grid without crashing', async () => {
    const { AcademicProfiles } =
      await import('@/shared/components/common/academic-profiles');
    renderWithProviders(<AcademicProfiles variant="grid" />);
    expect(document.body).toBeTruthy();
  });
});
