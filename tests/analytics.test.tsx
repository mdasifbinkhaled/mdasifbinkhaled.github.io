import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PublicationCard } from '../src/features/publications/publication-card';
import { academicEvents } from '../src/shared/lib/analytics';
import type { PublicationItem } from '../src/shared/types';

// Mock analytics
vi.mock('@/shared/lib/analytics', () => ({
  academicEvents: {
    viewPublication: vi.fn(),
    downloadPublication: vi.fn(),
    downloadCV: vi.fn(),
    viewCV: vi.fn(),
  },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

const mockPublication: PublicationItem = {
  id: 'test-pub-1',
  title: 'Test Publication',
  type: 'Journal',
  authors: ['Test Author'],
  venue: 'Test Journal',
  year: 2024,
  abstract: 'Test abstract',
  keywords: ['AI', 'Machine Learning'],
  link: 'https://example.com/paper',
  pdfLink: 'https://example.com/paper.pdf',
};

describe('Analytics Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Publication Card Analytics', () => {
    it('should track publication view when clicking View link', () => {
      render(<PublicationCard publication={mockPublication} />);

      const viewButton = screen.getByText('View');
      fireEvent.click(viewButton);

      expect(academicEvents.viewPublication).toHaveBeenCalledWith(
        mockPublication.id,
        mockPublication.title
      );
    });

    it('should track publication download when clicking PDF link', () => {
      render(<PublicationCard publication={mockPublication} />);

      const pdfButton = screen.getByText('PDF');
      fireEvent.click(pdfButton);

      expect(academicEvents.downloadPublication).toHaveBeenCalledWith(
        mockPublication.id,
        mockPublication.title
      );
    });

    it('should handle publication without id by using title', () => {
      const { id, ...publicationWithoutId } = mockPublication;

      render(
        <PublicationCard publication={{ ...publicationWithoutId, id: '' }} />
      );

      const viewButton = screen.getByText('View');
      fireEvent.click(viewButton);

      expect(academicEvents.viewPublication).toHaveBeenCalledWith(
        mockPublication.title,
        mockPublication.title
      );
    });

    it('should not render analytics buttons when links are missing', () => {
      const publicationNoLinks = {
        ...mockPublication,
        link: undefined,
        pdfLink: undefined,
      };

      render(<PublicationCard publication={publicationNoLinks} />);

      expect(screen.queryByText('View')).not.toBeInTheDocument();
      expect(screen.queryByText('PDF')).not.toBeInTheDocument();
    });
  });

  describe('Analytics Functions', () => {
    it('should have all required academic event functions', () => {
      expect(academicEvents.viewPublication).toBeDefined();
      expect(academicEvents.downloadPublication).toBeDefined();
      expect(academicEvents.downloadCV).toBeDefined();
      expect(academicEvents.viewCV).toBeDefined();
    });
  });
});
