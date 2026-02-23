import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout';
import { AppProviders } from '@/shared/providers/app-providers';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}

test('mobile sheet is labeled', async () => {
  render(
    <TestWrapper>
      <AppSidebarLayout>
        <div>content</div>
      </AppSidebarLayout>
    </TestWrapper>
  );

  const user = userEvent.setup();

  // Test that the menu button has proper accessibility attributes
  const btn = screen.getByRole('button', { name: /menu|open navigation/i });
  expect(btn).toHaveAttribute('aria-controls', 'mobile-nav');
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  // Radix UI natively sets the expanded attribute on the trigger.
  // The label is 'Open Menu' due to our Navbar trigger mock.

  // Actually click it to mount the dialog internally
  await user.click(btn);

  // Test that the SheetTitle is rendered with proper text
  const title = await screen.findByText('Navigation menu');
  expect(title).toBeInTheDocument();
});
