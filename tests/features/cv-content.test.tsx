import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppProviders } from '@/shared/providers/app-providers';

// ── Mocks ────────────────────────────────────────────────────────────

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

vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  const Icon = ({
    'data-testid': testId,
    ...props
  }: Record<string, unknown>) => <svg data-testid={testId} {...props} />;
  return {
    ...actual,
    Download: (props: Record<string, unknown>) => (
      <Icon data-testid="download-icon" {...props} />
    ),
    ExternalLinkIcon: (props: Record<string, unknown>) => (
      <Icon data-testid="external-link-icon" {...props} />
    ),
  };
});

vi.mock('@/shared/components/common/pdf-viewer-wrapper', () => ({
  PDFViewerWrapper: ({ file }: { file: string }) => (
    <div data-testid="pdf-viewer">{file}</div>
  ),
}));

vi.mock('@/shared/lib/analytics', () => ({
  academicEvents: {
    viewCV: vi.fn(),
    downloadCV: vi.fn(),
  },
}));

// ── Tests ────────────────────────────────────────────────────────────

describe('CVContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders PDF viewer tab by default', async () => {
    const CVContent = (await import('@/app/cv/cv-content.client')).default;
    render(
      <AppProviders>
        <CVContent />
      </AppProviders>
    );

    expect(screen.getByText('PDF Viewer')).toBeInTheDocument();
    expect(screen.getByText('CV Highlights')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-viewer')).toBeInTheDocument();
  });

  it('renders Download Full CV link', async () => {
    const CVContent = (await import('@/app/cv/cv-content.client')).default;
    render(
      <AppProviders>
        <CVContent />
      </AppProviders>
    );

    const downloadLink = screen.getByText('Download Full CV');
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(downloadLink.closest('a')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });

  it('tracks viewCV on mount', async () => {
    const { academicEvents } = await import('@/shared/lib/analytics');
    const CVContent = (await import('@/app/cv/cv-content.client')).default;

    render(
      <AppProviders>
        <CVContent />
      </AppProviders>
    );

    expect(academicEvents.viewCV).toHaveBeenCalledOnce();
  });

  it('renders CV Highlights tab content when clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const CVContent = (await import('@/app/cv/cv-content.client')).default;
    const user = userEvent.setup();

    render(
      <AppProviders>
        <CVContent />
      </AppProviders>
    );

    await user.click(screen.getByText('CV Highlights'));

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Research Interests')).toBeInTheDocument();
    expect(screen.getByText('Key Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Selected Publications')).toBeInTheDocument();
  });

  it('renders navigation links in highlights tab', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const CVContent = (await import('@/app/cv/cv-content.client')).default;
    const user = userEvent.setup();

    render(
      <AppProviders>
        <CVContent />
      </AppProviders>
    );

    await user.click(screen.getByText('CV Highlights'));

    expect(
      screen.getByText(/Learn more about my research/)
    ).toBeInTheDocument();
    expect(screen.getByText(/View all experiences/)).toBeInTheDocument();
    expect(screen.getByText(/Explore all publications/)).toBeInTheDocument();
  });
});
