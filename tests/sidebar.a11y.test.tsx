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
  const btn = screen.getByRole('button', { name: /menu|open navigation/i })
  await userEvent.click(btn)
  const dlg = await screen.findByRole('dialog', { name: /navigation menu/i })
  expect(dlg).toBeInTheDocument()
})