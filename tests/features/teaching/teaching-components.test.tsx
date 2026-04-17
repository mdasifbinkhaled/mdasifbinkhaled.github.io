import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TeachingHeroStats } from '@/features/teaching/components/teaching-hero-stats';
import { TeachingCTA } from '@/features/teaching/components/teaching-cta';
import { MentorshipSection } from '@/features/teaching/components/mentorship-section';
import { CourseCardCompact } from '@/features/teaching/components/course-card-compact';
import { CourseCard } from '@/features/teaching/components/course-card';
import type { CourseData } from '@/shared/types';

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

// Minimal course fixture for testing
const detailedCourse: CourseData = {
  id: 'test-cse101',
  title: 'Introduction to Computer Science',
  code: 'CSE 101',
  description: 'A foundational course covering the basics of CS.',
  level: 'undergraduate',
  semester: 'Fall',
  year: 2024,
  credits: 3,
  institution: 'IUB',
  tier: 'detailed',
  status: 'completed',
  outcomes: [
    'Understand CS fundamentals',
    'Write basic programs',
    'Apply problem-solving techniques',
  ],
};

const basicCourse: CourseData = {
  id: 'test-cse201',
  title: 'Data Structures',
  code: 'CSE 201',
  description: 'Covers arrays, linked lists, trees, and graphs.',
  level: 'undergraduate',
  semester: 'Spring',
  year: 2024,
  credits: 3,
  institution: 'IUB',
  tier: 'summary',
  status: 'completed',
  outcomes: ['Master linear and non-linear data structures'],
};

// ─── TeachingHeroStats ───────────────────────────────────────────────────────
describe('TeachingHeroStats', () => {
  const defaultProps = {
    totalStudents: 1500,
    totalCourses: 20,
    averageRating: 4.8,
    yearsTeaching: 5,
  };

  it('renders all four stat labels', () => {
    render(<TeachingHeroStats {...defaultProps} />);
    expect(screen.getByText('Students Mentored')).toBeInTheDocument();
    expect(screen.getByText('Courses Taught')).toBeInTheDocument();
    expect(screen.getByText('Average Rating')).toBeInTheDocument();
    expect(screen.getByText('Years Teaching')).toBeInTheDocument();
  });

  it('renders a 4-column grid', () => {
    const { container } = render(<TeachingHeroStats {...defaultProps} />);
    const grid = container.firstElementChild;
    expect(grid?.classList.contains('grid')).toBe(true);
  });
});

// ─── TeachingCTA ─────────────────────────────────────────────────────────────
describe('TeachingCTA', () => {
  it('renders the heading', () => {
    render(<TeachingCTA />);
    expect(
      screen.getByText('Interested in Academic Collaboration?')
    ).toBeInTheDocument();
  });

  it('renders contact link', () => {
    render(<TeachingCTA />);
    const link = screen.getByRole('link', { name: /Get in Touch/i });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('has proper aria-labelledby on the section', () => {
    render(<TeachingCTA />);
    const section = screen.getByRole('region', {
      name: /Academic Collaboration/i,
    });
    expect(section).toBeInTheDocument();
  });
});

// ─── MentorshipSection ───────────────────────────────────────────────────────
vi.mock('@/shared/lib/data/mentorship', () => ({
  mentorshipData: [
    {
      name: 'Alice Doe',
      role: 'Thesis Student' as const,
      period: '2024 - Present',
      project: 'XAI for Medical Imaging',
      status: 'Current' as const,
    },
    {
      name: 'Bob Smith',
      role: 'Undergraduate Researcher' as const,
      period: '2023 - 2024',
      project: 'Multimodal Sentiment Analysis',
      status: 'Alumni' as const,
    },
  ],
}));

describe('MentorshipSection', () => {
  it('renders the section heading', () => {
    render(<MentorshipSection />);
    expect(screen.getByText('Mentorship & Supervision')).toBeInTheDocument();
  });

  it('renders student cards from data', () => {
    render(<MentorshipSection />);
    expect(screen.getByText('Alice Doe')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('renders status badges (Current and Alumni)', () => {
    render(<MentorshipSection />);
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Alumni')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<MentorshipSection />);
    expect(screen.getByText('XAI for Medical Imaging')).toBeInTheDocument();
  });

  it('renders period information', () => {
    render(<MentorshipSection />);
    expect(screen.getByText('2024 - Present')).toBeInTheDocument();
  });

  it('returns null when data is empty', async () => {
    // Temporarily override the mock
    const mod = await import('@/shared/lib/data/mentorship');
    const original = [...mod.mentorshipData];
    mod.mentorshipData.length = 0;
    const { container } = render(<MentorshipSection />);
    expect(container.innerHTML).toBe('');
    // Restore
    original.forEach((s) => mod.mentorshipData.push(s));
  });
});

// ─── CourseCardCompact ───────────────────────────────────────────────────────
describe('CourseCardCompact', () => {
  it('renders course code and title', () => {
    render(<CourseCardCompact course={detailedCourse} />);
    expect(screen.getByText('CSE 101')).toBeInTheDocument();
    expect(
      screen.getByText('Introduction to Computer Science')
    ).toBeInTheDocument();
  });

  it('renders semester and year', () => {
    render(<CourseCardCompact course={detailedCourse} />);
    expect(screen.getByText(/Fall 2024/)).toBeInTheDocument();
  });

  it('wraps detailed-tier courses in a link', () => {
    const { container } = render(<CourseCardCompact course={detailedCourse} />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link?.getAttribute('href')).toContain('cse');
  });

  it('does NOT wrap basic-tier courses in a link', () => {
    const { container } = render(<CourseCardCompact course={basicCourse} />);
    const link = container.querySelector('a');
    expect(link).toBeNull();
  });

  it('renders level badge', () => {
    render(<CourseCardCompact course={detailedCourse} />);
    expect(screen.getByText('UNDERGRADUATE')).toBeInTheDocument();
  });
});

// ─── CourseCard ──────────────────────────────────────────────────────────────
describe('CourseCard', () => {
  it('renders course title and code', () => {
    render(<CourseCard course={detailedCourse} />);
    expect(
      screen.getByText('Introduction to Computer Science')
    ).toBeInTheDocument();
    expect(screen.getByText('CSE 101')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<CourseCard course={detailedCourse} />);
    expect(
      screen.getByText(/foundational course covering/i)
    ).toBeInTheDocument();
  });

  it('collapsible variant has toggle button', () => {
    render(<CourseCard course={detailedCourse} variant="collapsible" />);
    const button = screen.getByRole('button', { name: /Show Details/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggle expands and collapses details', () => {
    render(<CourseCard course={detailedCourse} variant="collapsible" />);
    const button = screen.getByRole('button', { name: /Show Details/i });

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Hide Details/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Hide Details/i }));
    expect(
      screen.getByRole('button', { name: /Show Details/i })
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders "View Course" link for detailed-tier courses', () => {
    render(<CourseCard course={detailedCourse} variant="collapsible" />);
    expect(
      screen.getByRole('link', { name: /View Course/i })
    ).toBeInTheDocument();
  });

  it('does NOT render "View Course" for basic-tier courses', () => {
    render(<CourseCard course={basicCourse} variant="collapsible" />);
    expect(
      screen.queryByRole('link', { name: /View Course/i })
    ).not.toBeInTheDocument();
  });

  it('defaultOpen renders expanded initially', () => {
    render(
      <CourseCard course={detailedCourse} variant="collapsible" defaultOpen />
    );
    expect(
      screen.getByRole('button', { name: /Hide Details/i })
    ).toBeInTheDocument();
  });
});
