import { render, screen } from '@testing-library/react'
import { vi, test, expect } from 'vitest'
import { Navbar } from '@/shared/components/navigation/navbar'

vi.mock('next/navigation', () => ({ usePathname: () => '/about/' }))

test('active link has aria-current', () => {
  render(<Navbar />)
  expect(screen.getByRole('link', { name: /about me/i })).toHaveAttribute('aria-current', 'page')
})