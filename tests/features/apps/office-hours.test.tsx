import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OfficeHoursBooker } from '@/features/apps/components/office-hours/office-hours-booker';

describe('OfficeHoursBooker', () => {
  it('renders all 3 office hour slots', () => {
    render(<OfficeHoursBooker />);
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
  });

  it('displays correct times and locations', () => {
    render(<OfficeHoursBooker />);
    expect(screen.getAllByText('11:00 AM - 1:00 PM')).toHaveLength(2);
    expect(screen.getByText('2:00 PM - 4:00 PM')).toBeInTheDocument();
    expect(screen.getAllByText('UB 0503')).toHaveLength(2);
    expect(screen.getByText('Google Meet')).toBeInTheDocument();
  });

  it('shows In-Person and Online badges', () => {
    render(<OfficeHoursBooker />);
    expect(screen.getAllByText('In-Person')).toHaveLength(2);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders Request Slot mailto links with correct structure', () => {
    render(<OfficeHoursBooker />);
    const requestLinks = screen.getAllByText('Request Slot');
    expect(requestLinks).toHaveLength(3);

    // Each should be inside an anchor with mailto href
    requestLinks.forEach((link) => {
      const anchor = link.closest('a');
      expect(anchor).not.toBeNull();
      expect(anchor!.href).toMatch(/^mailto:/);
      expect(anchor!.href).toContain('Office%20Hours%20Request');
    });
  });

  it('renders scheduling policy section', () => {
    render(<OfficeHoursBooker />);
    expect(screen.getByText('Scheduling Policy')).toBeInTheDocument();
    expect(
      screen.getByText(/Office hours are dedicated blocks/i)
    ).toBeInTheDocument();
  });
});
