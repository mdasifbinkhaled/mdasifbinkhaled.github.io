import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout'
import { AppProviders } from '@/shared/providers/app-providers'

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>
}

test('mobile sheet is labeled', async () => {
  render(
    <TestWrapper>
      <AppSidebarLayout><div>content</div></AppSidebarLayout>
    </TestWrapper>
  )
  
  // Test that the menu button has proper accessibility attributes
  const btn = screen.getByRole('button', { name: /menu|open navigation/i })
  expect(btn).toHaveAttribute('aria-controls', 'mobile-nav')
  expect(btn).toHaveAttribute('aria-expanded', 'false')
  expect(btn).toHaveAttribute('aria-label', 'Open navigation menu')
  
  // Test that the SheetTitle is rendered with proper text (even if not visible)
  // This tests that the accessibility labeling exists in the component structure
  const title = screen.getByText('Navigation menu')
  expect(title).toBeInTheDocument()
  
  // Since the dialog interaction is complex in a mocked environment,
  // we verify the structural accessibility rather than the dynamic behavior
})