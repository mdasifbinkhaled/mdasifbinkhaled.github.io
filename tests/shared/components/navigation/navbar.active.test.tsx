import { render, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import { Navbar } from '@/shared/components/navigation/navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/about/',
  useRouter: () => ({ push: vi.fn() }),
}));

test('active link has aria-current', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
    'aria-current',
    'page'
  );
});
