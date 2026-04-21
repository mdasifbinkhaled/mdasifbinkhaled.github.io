// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToolSettings } from '@/shared/components/common/tool-settings';

describe('<ToolSettings>', () => {
  it('renders a trigger button', () => {
    render(
      <ToolSettings
        toolName="Seat Planner"
        onExportBackup={vi.fn()}
        onReset={vi.fn()}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('uses a custom label when provided', () => {
    render(
      <ToolSettings
        toolName="Seat Planner"
        label="Options"
        onExportBackup={vi.fn()}
        onReset={vi.fn()}
      />
    );
    // label is read by screen readers / shown as accessible name
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toMatch(/options/i);
  });
});
