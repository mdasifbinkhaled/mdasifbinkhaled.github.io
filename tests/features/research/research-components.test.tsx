import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  ResearchHero,
  ResearchVision,
  PrimaryAreas,
  CurrentFocus,
  FeaturedProjects,
  OpenSource,
  LookingAhead,
  ResearchCTA,
} from '@/features/research';

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

// ─── ResearchHero ────────────────────────────────────────────────────────────
describe('ResearchHero', () => {
  it('renders the research philosophy heading', () => {
    render(<ResearchHero />);
    expect(
      screen.getByText('Breaking Out of the Black Box')
    ).toBeInTheDocument();
  });

  it('renders quick stat highlights', () => {
    render(<ResearchHero />);
    expect(screen.getByText('XAI')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.getByText('Multimodal')).toBeInTheDocument();
  });

  it('renders the research profiles prompt', () => {
    render(<ResearchHero />);
    expect(screen.getByText('Find my research profiles:')).toBeInTheDocument();
  });

  it('renders as a section element', () => {
    const { container } = render(<ResearchHero />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});

// ─── ResearchVision ──────────────────────────────────────────────────────────
describe('ResearchVision', () => {
  it('renders the research vision heading', () => {
    render(<ResearchVision />);
    expect(screen.getByText('Research Vision')).toBeInTheDocument();
  });

  it('renders the "Why It Matters" explanation', () => {
    render(<ResearchVision />);
    expect(screen.getByText('Why It Matters')).toBeInTheDocument();
  });

  it('renders healthcare context about AI decisions', () => {
    render(<ResearchVision />);
    expect(
      screen.getByText(/AI decisions can mean life or death/i)
    ).toBeInTheDocument();
  });
});

// ─── PrimaryAreas ────────────────────────────────────────────────────────────
describe('PrimaryAreas', () => {
  it('renders the section heading', () => {
    render(<PrimaryAreas />);
    expect(screen.getByText('Primary Research Areas')).toBeInTheDocument();
  });

  it('renders all three primary research area names', () => {
    render(<PrimaryAreas />);
    expect(screen.getByText('Healthcare AI')).toBeInTheDocument();
    expect(screen.getByText('Multimodal AI')).toBeInTheDocument();
    expect(screen.getByText('Explainable AI (XAI)')).toBeInTheDocument();
  });

  it('renders keyword badges for each area', () => {
    render(<PrimaryAreas />);
    expect(screen.getByText('Medical AI')).toBeInTheDocument();
    expect(screen.getByText('Data Fusion')).toBeInTheDocument();
    expect(screen.getByText('Interpretability')).toBeInTheDocument();
  });

  it('renders cards with id="research-areas"', () => {
    const { container } = render(<PrimaryAreas />);
    expect(container.querySelector('#research-areas')).toBeInTheDocument();
  });
});

// ─── CurrentFocus ────────────────────────────────────────────────────────────
describe('CurrentFocus', () => {
  it('renders the current focus heading', () => {
    render(<CurrentFocus />);
    expect(screen.getByText('Current Research Focus')).toBeInTheDocument();
  });

  it('renders the primary focus statement', () => {
    render(<CurrentFocus />);
    expect(screen.getByText(/Stroke-related problems/i)).toBeInTheDocument();
  });

  it('renders research domain badges', () => {
    render(<CurrentFocus />);
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.getByText('Remote Sensing')).toBeInTheDocument();
    expect(screen.getByText('Signal Processing')).toBeInTheDocument();
  });

  it('renders methodology note', () => {
    render(<CurrentFocus />);
    expect(
      screen.getByText(
        /Methodological research with emphasis on explainability/i
      )
    ).toBeInTheDocument();
  });
});

// ─── FeaturedProjects ────────────────────────────────────────────────────────
describe('FeaturedProjects', () => {
  it('renders the section heading', () => {
    render(<FeaturedProjects />);
    expect(screen.getByText('Featured Research Projects')).toBeInTheDocument();
  });

  it('renders all featured project titles', () => {
    render(<FeaturedProjects />);
    expect(
      screen.getByText('AI-Powered Stroke Analysis and Prediction')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Multimodal AI for Healthcare Diagnostics')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Remote Sensing and Signal Processing Applications')
    ).toBeInTheDocument();
  });

  it('renders project status badges', () => {
    render(<FeaturedProjects />);
    const ongoingBadges = screen.getAllByText('Ongoing');
    expect(ongoingBadges.length).toBe(3);
  });

  it('renders placeholder notices for projects', () => {
    render(<FeaturedProjects />);
    const placeholders = screen.getAllByText(
      'Detailed Information Coming Soon'
    );
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('renders with id="research-projects"', () => {
    const { container } = render(<FeaturedProjects />);
    expect(container.querySelector('#research-projects')).toBeInTheDocument();
  });
});

// ─── OpenSource ──────────────────────────────────────────────────────────────
describe('OpenSource', () => {
  it('renders the section heading', () => {
    render(<OpenSource />);
    expect(screen.getByText('Open Source Contributions')).toBeInTheDocument();
  });

  it('renders library names', () => {
    render(<OpenSource />);
    expect(screen.getByText('SortyPy')).toBeInTheDocument();
    expect(screen.getByText('SearchyPy')).toBeInTheDocument();
  });

  it('renders GitHub links with proper attributes', () => {
    render(<OpenSource />);
    const links = screen.getAllByText(/View on GitHub/i);
    expect(links.length).toBe(2);

    const parentLink = links[0]?.closest('a');
    expect(parentLink).toHaveAttribute('target', '_blank');
    expect(parentLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders status badges', () => {
    render(<OpenSource />);
    const statusBadges = screen.getAllByText('In Development');
    expect(statusBadges.length).toBe(2);
  });
});

// ─── LookingAhead ────────────────────────────────────────────────────────────
describe('LookingAhead', () => {
  it('renders the section heading', () => {
    render(<LookingAhead />);
    expect(screen.getByText('Looking Ahead')).toBeInTheDocument();
  });

  it('renders long-term vision and impact goal headers', () => {
    render(<LookingAhead />);
    expect(screen.getByText('Long-term Vision')).toBeInTheDocument();
    expect(screen.getByText('Impact Goal')).toBeInTheDocument();
  });

  it('renders goal content from data', () => {
    render(<LookingAhead />);
    expect(
      screen.getByText(
        /Become an expert in the field working towards innovations/i
      )
    ).toBeInTheDocument();
  });
});

// ─── ResearchCTA ─────────────────────────────────────────────────────────────
describe('ResearchCTA', () => {
  it('renders the CTA heading', () => {
    render(<ResearchCTA />);
    expect(screen.getByText('Explore My Research Further')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<ResearchCTA />);
    expect(
      screen.getByRole('link', { name: /View Publications/i })
    ).toHaveAttribute('href', '/publications');
    expect(screen.getByRole('link', { name: /Get in Touch/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('renders GitHub link with external attributes', () => {
    render(<ResearchCTA />);
    const githubLink = screen.getByRole('link', {
      name: /GitHub Projects/i,
    });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
