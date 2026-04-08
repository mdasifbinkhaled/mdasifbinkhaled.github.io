import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuickFacts } from '@/features/about/components/quick-facts';
import { CtaSection } from '@/features/about/components/cta-section';

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

describe('QuickFacts', () => {
  it('renders quick facts from data', () => {
    const { container } = render(<QuickFacts />);
    // Should render at least one fact item
    const factItems = container.querySelectorAll('.flex.items-start');
    expect(factItems.length).toBeGreaterThan(0);
  });
});

describe('CtaSection', () => {
  it('renders the connect section', () => {
    render(<CtaSection />);
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });

  it('renders contact link', () => {
    render(<CtaSection />);
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('renders external profile links', () => {
    render(<CtaSection />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'target',
      '_blank'
    );
    expect(
      screen.getByRole('link', { name: /google scholar/i })
    ).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: /orcid/i })).toHaveAttribute(
      'target',
      '_blank'
    );
  });
});
