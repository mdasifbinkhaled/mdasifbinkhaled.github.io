import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PublicationList } from '@/features/publications/components/publication-list';
import type { PublicationItem } from '@/shared/types';

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

const mockPublications: PublicationItem[] = [
  {
    id: 'pub-1',
    title: 'Explainable AI in Healthcare',
    authors: ['Md Asif Bin Khaled', 'Jane Doe'],
    venue: 'ICML 2024',
    year: 2024,
    type: 'Conference',
    link: 'https://example.com/pub1',
    keywords: ['XAI', 'Healthcare'],
    abstract: 'A study on applying XAI in clinical settings.',
  },
  {
    id: 'pub-2',
    title: 'Multimodal Signal Processing',
    authors: ['John Smith', 'Md Asif Bin Khaled'],
    venue: 'IEEE Transactions',
    year: 2023,
    type: 'Journal',
    pdfLink: 'https://example.com/pub2.pdf',
    keywords: ['Signal Processing'],
  },
  {
    id: 'pub-3',
    title: 'Stroke Prediction Using ML',
    authors: ['Md Asif Bin Khaled'],
    venue: 'Workshop on AI for Health',
    year: 2024,
    type: 'Workshop',
  },
];

describe('PublicationList', () => {
  it('renders all publications', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    expect(
      screen.getByText('Explainable AI in Healthcare')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Multimodal Signal Processing')
    ).toBeInTheDocument();
    expect(screen.getByText('Stroke Prediction Using ML')).toBeInTheDocument();
  });

  it('renders filter controls', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
  });

  it('renders empty state message for no publications', () => {
    render(<PublicationList initialPublications={[]} />);
    expect(screen.getByText('No publications to display.')).toBeInTheDocument();
  });

  it('filters by search term', async () => {
    render(<PublicationList initialPublications={mockPublications} />);
    const searchInput = screen.getByLabelText('Search');

    fireEvent.change(searchInput, { target: { value: 'Healthcare' } });

    // The search is debounced, so we need to wait
    await vi.waitFor(() => {
      expect(
        screen.getByText('Explainable AI in Healthcare')
      ).toBeInTheDocument();
    });
  });

  it('renders publication authors', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    expect(
      screen.getByText(/Md Asif Bin Khaled, Jane Doe/)
    ).toBeInTheDocument();
  });

  it('renders venue information', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    expect(screen.getByText('ICML 2024')).toBeInTheDocument();
    expect(screen.getByText('IEEE Transactions')).toBeInTheDocument();
  });

  it('renders type badges', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    expect(screen.getByText('Conference')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
    expect(screen.getByText('Workshop')).toBeInTheDocument();
  });

  it('renders view link for publications with link', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    const viewLinks = screen.getAllByText('View');
    expect(viewLinks.length).toBeGreaterThan(0);
  });

  it('renders PDF link for publications with pdfLink', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    const pdfLinks = screen.getAllByText('PDF');
    expect(pdfLinks.length).toBe(1);
  });

  it('renders copy citation buttons', () => {
    render(<PublicationList initialPublications={mockPublications} />);
    const copyButtons = screen.getAllByText('Copy Citation');
    expect(copyButtons.length).toBe(3);
  });
});
