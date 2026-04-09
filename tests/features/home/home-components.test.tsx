import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from '@/features/home/components/hero-section';
import { ConnectSection } from '@/features/home/components/connect-section';
import { ResearchHighlights } from '@/features/home/components/research-highlights';
import {
  PublicationsPreview,
  ExperiencePreview,
  FeaturedGrant,
} from '@/features/home/components/content-previews';
import { ExperienceCompact } from '@/features/home/components/experience-compact';
import type { ExperienceItem } from '@/shared/types';

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

vi.mock('@/shared/lib/analytics', () => ({
  academicEvents: {
    viewPublication: vi.fn(),
    downloadPublication: vi.fn(),
  },
}));

// StatCard uses next/dynamic internally — mock it to render label text directly
vi.mock('@/shared/components/common/stat-card', () => ({
  StatCard: ({
    label,
    number: num,
    description,
  }: {
    label: string;
    number: string | number;
    description?: string;
  }) => (
    <div data-testid="stat-card">
      <span>{num}</span>
      <span>{label}</span>
      {description && <span>{description}</span>}
    </div>
  ),
}));

// ─── HeroSection ─────────────────────────────────────────────────────────────
describe('HeroSection', () => {
  it('renders the author name heading', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders the welcome badge', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('Welcome to my academic portfolio')
    ).toBeInTheDocument();
  });

  it('renders CTA links to research and teaching', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole('link', { name: /Explore Research/i })
    ).toHaveAttribute('href', '/research');
    expect(
      screen.getByRole('link', { name: /View Teaching Portfolio/i })
    ).toHaveAttribute('href', '/teaching');
  });

  it('renders stat cards', () => {
    render(<HeroSection />);
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Student Eval')).toBeInTheDocument();
    expect(screen.getByText('Research Grants')).toBeInTheDocument();
    expect(screen.getByText('Research Areas')).toBeInTheDocument();
  });

  it('renders the philosophy quote', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(
        /Whatever decisions are being taken should be explainable/i
      )
    ).toBeInTheDocument();
  });
});

// ─── ConnectSection ──────────────────────────────────────────────────────────
describe('ConnectSection', () => {
  it('renders the section heading', () => {
    render(<ConnectSection />);
    expect(screen.getByText('Connect & Collaborate')).toBeInTheDocument();
  });

  it('renders all six social link names', () => {
    render(<ConnectSection />);
    expect(screen.getByText('Google Scholar')).toBeInTheDocument();
    expect(screen.getByText('ResearchGate')).toBeInTheDocument();
    expect(screen.getByText('ORCID')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the contact CTA button', () => {
    render(<ConnectSection />);
    expect(screen.getByRole('link', { name: /Get in Touch/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('external links have proper security attributes', () => {
    render(<ConnectSection />);
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('email link is not external', () => {
    render(<ConnectSection />);
    const emailLink = screen.getByText('Email').closest('a');
    expect(emailLink).not.toHaveAttribute('target');
    expect(emailLink?.getAttribute('href')).toContain('mailto:');
  });
});

// ─── ResearchHighlights ──────────────────────────────────────────────────────
describe('ResearchHighlights', () => {
  it('renders the section heading', () => {
    render(<ResearchHighlights />);
    expect(screen.getByText('Research Interests')).toBeInTheDocument();
  });

  it('renders interest cards from data', () => {
    const { container } = render(<ResearchHighlights />);
    // Each interest has a Card with absolute gradient accent bar
    const cards = container.querySelectorAll('[class*="shadow"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders view all link to research page', () => {
    render(<ResearchHighlights />);
    expect(
      screen.getByRole('link', { name: /View All Research/i })
    ).toHaveAttribute('href', '/research');
  });
});

// ─── ExperienceCompact ───────────────────────────────────────────────────────
describe('ExperienceCompact', () => {
  const mockExperiences: ExperienceItem[] = [
    {
      id: 'exp1',
      title: 'Lecturer',
      institution: 'IUB',
      duration: '2023 - Present',
      location: 'Dhaka',
      description: ['Teaching CS courses', 'Research mentoring'],
      tags: ['Teaching', 'AI', 'Research'],
    },
    {
      id: 'exp2',
      title: 'Research Assistant',
      institution: 'BRACU',
      duration: '2021 - 2022',
      location: 'Dhaka',
      description: ['Data analysis', 'Paper writing'],
      tags: ['Research'],
    },
  ];

  it('renders all experience titles', () => {
    render(<ExperienceCompact experiences={mockExperiences} />);
    expect(screen.getByText('Lecturer')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
  });

  it('renders institution names', () => {
    render(<ExperienceCompact experiences={mockExperiences} />);
    expect(screen.getByText('IUB')).toBeInTheDocument();
    expect(screen.getByText('BRACU')).toBeInTheDocument();
  });

  it('renders "Current" badge for present positions', () => {
    render(<ExperienceCompact experiences={mockExperiences} />);
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Past')).toBeInTheDocument();
  });

  it('renders location information', () => {
    render(<ExperienceCompact experiences={mockExperiences} />);
    const locations = screen.getAllByText('Dhaka');
    expect(locations.length).toBe(2);
  });

  it('renders tag badges', () => {
    render(<ExperienceCompact experiences={mockExperiences} />);
    expect(screen.getByText('Teaching')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('renders empty state gracefully', () => {
    const { container } = render(<ExperienceCompact experiences={[]} />);
    expect(container.querySelector('.grid')).toBeInTheDocument();
  });
});

// ─── PublicationsPreview ─────────────────────────────────────────────────────
describe('PublicationsPreview', () => {
  it('renders the section heading', () => {
    render(<PublicationsPreview />);
    expect(screen.getByText('Recent Publications')).toBeInTheDocument();
  });

  it('renders link to full publications page', () => {
    render(<PublicationsPreview />);
    expect(
      screen.getByRole('link', { name: /View All Publications/i })
    ).toHaveAttribute('href', '/publications');
  });
});

// ─── ExperiencePreview ───────────────────────────────────────────────────────
describe('ExperiencePreview', () => {
  it('renders the section heading', () => {
    render(<ExperiencePreview />);
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
  });

  it('renders link to full experience page', () => {
    render(<ExperiencePreview />);
    expect(
      screen.getByRole('link', { name: /View Full Experience/i })
    ).toHaveAttribute('href', '/experience');
  });
});

// ─── FeaturedGrant ───────────────────────────────────────────────────────────
describe('FeaturedGrant', () => {
  it('renders the grant section heading', () => {
    render(<FeaturedGrant />);
    expect(screen.getByText('Featured Research Grant')).toBeInTheDocument();
  });

  it('renders the grant title', () => {
    render(<FeaturedGrant />);
    expect(
      screen.getByText('Unveiling the Linguistic Diversity of Bangla')
    ).toBeInTheDocument();
  });

  it('renders link to research page', () => {
    render(<FeaturedGrant />);
    expect(
      screen.getByRole('link', { name: /View All Research Projects/i })
    ).toHaveAttribute('href', '/research');
  });
});
