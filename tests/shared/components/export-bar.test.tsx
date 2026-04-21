// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExportBar } from '@/shared/components/common/export-bar';

describe('<ExportBar>', () => {
  it('renders a trigger button with the given label', () => {
    render(<ExportBar handlers={{ csv: vi.fn() }} label="Download" />);
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('renders "Export" by default', () => {
    render(<ExportBar handlers={{ csv: vi.fn() }} />);
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });

  it('renders nothing when no handlers are provided', () => {
    const { container } = render(<ExportBar handlers={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('is disabled when `disabled` prop is true', () => {
    render(<ExportBar handlers={{ csv: vi.fn() }} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
