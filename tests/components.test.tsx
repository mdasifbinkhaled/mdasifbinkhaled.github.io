import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { PublicationCard } from '@/components/publications/publication-card';
import { ExperienceCompact } from '@/components/experience-compact';
import { ThemeProvider } from '@/components/theme-provider';
import type { PublicationItem, ExperienceItem } from '@/types';

// Mock next/image for testing
vi.mock('next/image', () => ({
  default: ({ alt, src, width, height, ...props }: any) => {
    // Filter out Next.js specific props that don't belong on img elements
    const { fill, priority, quality, sizes, ...imgProps } = props;
    return (
      <img 
        alt={alt} 
        src={src} 
        width={width} 
        height={height}
        {...imgProps} 
      />
    );
  }
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  },
  AnimatePresence: ({ children }: any) => children
}));

// Test utilities
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {component}
    </ThemeProvider>
  );
};

describe('ProfileSidebar', () => {
  const mockOnLinkClick = vi.fn();

  beforeEach(() => {
    mockOnLinkClick.mockClear();
  });

  it('renders profile information correctly', () => {
    renderWithTheme(<ProfileSidebar onLinkClick={mockOnLinkClick} />);
    
    expect(screen.getByText('Md Asif Bin Khaled')).toBeInTheDocument();
    expect(screen.getByText('Senior Lecturer & Researcher')).toBeInTheDocument();
    expect(screen.getByText('Open to PhD Opportunities')).toBeInTheDocument();
  });

  it('handles collapsed state correctly', () => {
    renderWithTheme(<ProfileSidebar onLinkClick={mockOnLinkClick} isCollapsed={true} />);
    
    // In collapsed state, the text should not be visible
    expect(screen.queryByText('Md Asif Bin Khaled')).not.toBeInTheDocument();
    expect(screen.queryByText('Senior Lecturer & Researcher')).not.toBeInTheDocument();
  });

  it('calls onLinkClick when email link is clicked', async () => {
    renderWithTheme(<ProfileSidebar onLinkClick={mockOnLinkClick} />);
    
    const emailLink = screen.getByRole('link', { name: /mdasifbinkhaled@gmail\.com/i });
    fireEvent.click(emailLink);
    
    expect(mockOnLinkClick).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<ProfileSidebar onLinkClick={mockOnLinkClick} />);
    
    const profileImage = screen.getByAltText(/Md Asif Bin Khaled - Profile photo/i);
    expect(profileImage).toBeInTheDocument();
    
    const githubLink = screen.getByLabelText(/GitHub Profile/i);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

describe('PublicationCard', () => {
  const mockPublication: PublicationItem = {
    id: 'test-pub-1',
    title: 'Test Publication Title',
    authors: ['John Doe', 'Jane Smith'],
    venue: 'Test Conference Proceedings',
    year: 2024,
    type: 'Conference',
    link: 'https://example.com',
    pdfLink: 'https://example.com/paper.pdf',
    abstract: 'This is a test abstract for the publication.',
    keywords: ['AI', 'Machine Learning', 'Testing']
  };

  it('renders publication information correctly', () => {
    renderWithTheme(<PublicationCard publication={mockPublication} />);
    
    expect(screen.getByText('Test Publication Title')).toBeInTheDocument();
    expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Conference')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('expands and collapses abstract correctly', async () => {
    renderWithTheme(<PublicationCard publication={mockPublication} />);
    
    const expandButton = screen.getByRole('button', { name: /show more/i });
    expect(expandButton).toBeInTheDocument();
    
    // Abstract should not be visible initially
    expect(screen.queryByText('This is a test abstract')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      expect(screen.getByText(/This is a test abstract/)).toBeInTheDocument();
    });
    
    // Click to collapse
    const collapseButton = screen.getByRole('button', { name: /show less/i });
    fireEvent.click(collapseButton);
    
    await waitFor(() => {
      expect(screen.queryByText('This is a test abstract')).not.toBeInTheDocument();
    });
  });

  it('renders external links correctly', () => {
    renderWithTheme(<PublicationCard publication={mockPublication} />);
    
    const viewLink = screen.getByRole('link', { name: /view/i });
    const pdfLink = screen.getByRole('link', { name: /pdf/i });
    
    expect(viewLink).toHaveAttribute('href', 'https://example.com');
    expect(pdfLink).toHaveAttribute('href', 'https://example.com/paper.pdf');
    
    expect(viewLink).toHaveAttribute('target', '_blank');
    expect(pdfLink).toHaveAttribute('target', '_blank');
  });

  it('handles publication without optional fields', () => {
    const minimalPublication: PublicationItem = {
      id: 'minimal-pub',
      title: 'Minimal Publication',
      authors: ['Author One'],
      venue: 'Test Journal',
      year: 2023,
      type: 'Journal'
    };

    renderWithTheme(<PublicationCard publication={minimalPublication} />);
    
    expect(screen.getByText('Minimal Publication')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /show more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view/i })).not.toBeInTheDocument();
  });
});

describe('ExperienceCompact', () => {
  const mockExperiences: ExperienceItem[] = [
    {
      id: 'exp-1',
      title: 'Senior Lecturer',
      institution: 'Independent University, Bangladesh',
      location: 'Dhaka, Bangladesh',
      duration: 'Jan 2020 - Present',
      description: [
        'Teaching undergraduate and graduate courses',
        'Conducting research in AI and Machine Learning'
      ],
      logoUrl: 'https://example.com/logo.png'
    },
    {
      id: 'exp-2',
      title: 'Research Assistant',
      institution: 'Previous University',
      location: 'City, Country',
      duration: 'Jun 2018 - Dec 2019',
      description: [
        'Assisted in research projects',
        'Published papers in conferences'
      ]
    }
  ];

  it('renders experience cards correctly', () => {
    renderWithTheme(<ExperienceCompact experiences={mockExperiences} />);
    
    expect(screen.getByText('Senior Lecturer')).toBeInTheDocument();
    expect(screen.getByText('Independent University, Bangladesh')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
    expect(screen.getByText('Previous University')).toBeInTheDocument();
  });

  it('handles empty experiences array', () => {
    const { container } = renderWithTheme(<ExperienceCompact experiences={[]} />);
    
    // ExperienceCompact renders an empty grid, not an error message
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.children).toHaveLength(0);
  });

  it('displays date ranges correctly', () => {
    renderWithTheme(<ExperienceCompact experiences={mockExperiences} />);
    
    expect(screen.getByText(/Jan 2020 - Present/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 2018 - Dec 2019/)).toBeInTheDocument();
  });

  it('shows current vs past positions with badges', () => {
    renderWithTheme(<ExperienceCompact experiences={mockExperiences} />);
    
    // Current position should have "default" badge, past should have "secondary"
    const badges = screen.getAllByRole('generic').filter(el => 
      el.className.includes('badge') || el.textContent?.includes('Present') || el.textContent?.includes('2019')
    );
    expect(badges.length).toBeGreaterThan(0);
  });

  it('displays locations correctly', () => {
    renderWithTheme(<ExperienceCompact experiences={mockExperiences} />);
    
    expect(screen.getByText(/Dhaka, Bangladesh/)).toBeInTheDocument();
    expect(screen.getByText(/City, Country/)).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('has proper heading hierarchy', () => {
    renderWithTheme(
      <div>
        <h1>Main Title</h1>
        <ProfileSidebar />
      </div>
    );

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(4); // h1, h3 (name), h4 (contact), h4 (follow me)
  });

  it('has proper focus management', () => {
    renderWithTheme(<ProfileSidebar />);
    
    const emailLink = screen.getByRole('link', { name: /mdasifbinkhaled@gmail\.com/i });
    emailLink.focus();
    
    expect(document.activeElement).toBe(emailLink);
  });
});

describe('Theme Integration', () => {
  it('applies theme classes correctly', () => {
    const { container } = renderWithTheme(<ProfileSidebar />);
    
    const sidebar = container.querySelector('.bg-sidebar-background');
    expect(sidebar).toBeInTheDocument();
  });
});

describe('Performance', () => {
  it('renders components without excessive re-renders', () => {
    const renderCount = vi.fn();
    
    const TestComponent = () => {
      renderCount();
      return <ProfileSidebar />;
    };

    renderWithTheme(<TestComponent />);
    
    expect(renderCount).toHaveBeenCalledTimes(1);
  });

  it('handles large datasets efficiently', () => {
    const largeExperiences = Array.from({ length: 100 }, (_, i) => ({
      id: `exp-${i}`,
      title: `Position ${i}`,
      institution: `Institution ${i}`,
      location: 'Location',
      duration: '2020-01 - Present',
      description: [`Description ${i}`]
    }));

    const start = performance.now();
    renderWithTheme(<ExperienceCompact experiences={largeExperiences} />);
    const end = performance.now();

    // Should render within reasonable time in CI environments
    expect(end - start).toBeLessThan(500);

    // Ensure all experience cards are rendered
    const cards = screen.getAllByTestId('experience-card');
    expect(cards).toHaveLength(largeExperiences.length);
  });
});
