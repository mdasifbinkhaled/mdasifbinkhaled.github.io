import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from '@/shared/components/layout/page-header';
import { SectionHeading } from '@/shared/components/layout/section-heading';
import { ContentColumn } from '@/shared/components/layout/content-column';

describe('PageHeader', () => {
  it('renders the title as the single h1 with the canonical hero scale', () => {
    render(<PageHeader title="Teaching" />);
    const h1 = screen.getByRole('heading', { level: 1, name: 'Teaching' });
    expect(h1.className).toContain('text-3xl');
    expect(h1.className).toContain('font-bold');
  });

  it('renders eyebrow + lead when provided', () => {
    render(<PageHeader eyebrow="Teaching" title="Courses" lead="A record." />);
    expect(screen.getByText('Teaching')).toBeInTheDocument();
    expect(screen.getByText('A record.')).toBeInTheDocument();
  });

  it('applies the sanctioned gradient only when opted in', () => {
    const { rerender } = render(<PageHeader title="Plain" />);
    expect(screen.getByRole('heading', { level: 1 }).className).not.toContain(
      'bg-clip-text'
    );
    rerender(<PageHeader title="Fancy" gradient />);
    expect(screen.getByRole('heading', { level: 1 }).className).toContain(
      'bg-clip-text'
    );
  });
});

describe('SectionHeading', () => {
  it('renders the canonical section style (semibold foreground, not primary)', () => {
    render(<SectionHeading>Courses</SectionHeading>);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Courses' });
    expect(h2.className).toContain('text-2xl');
    expect(h2.className).toContain('font-semibold');
    expect(h2.className).toContain('text-foreground');
    expect(h2.className).not.toContain('font-bold');
    expect(h2.className).not.toContain('text-primary');
  });

  it('renders as h3 with a smaller size when asked', () => {
    render(<SectionHeading as="h3">Sub</SectionHeading>);
    const h3 = screen.getByRole('heading', { level: 3, name: 'Sub' });
    expect(h3.className).toContain('text-xl');
  });

  it('renders a description and right-aligned actions', () => {
    render(
      <SectionHeading description="all courses" actions={<button>Sort</button>}>
        Record
      </SectionHeading>
    );
    expect(screen.getByText('all courses')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sort' })).toBeInTheDocument();
  });
});

describe('ContentColumn', () => {
  it('wraps children in the responsive frame + a named max-width', () => {
    const { container } = render(
      <ContentColumn width="wide">
        <p>body</p>
      </ContentColumn>
    );
    expect(container.querySelector('.container-responsive')).toBeTruthy();
    expect(container.querySelector('.max-w-7xl')).toBeTruthy();
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('defaults to the standard width', () => {
    const { container } = render(
      <ContentColumn>
        <p>x</p>
      </ContentColumn>
    );
    expect(container.querySelector('.max-w-5xl')).toBeTruthy();
  });
});
