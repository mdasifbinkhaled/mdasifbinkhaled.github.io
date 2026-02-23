import { render, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import { Navbar } from '@/shared/components/navigation/navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/about/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock lucide-react icons — Proxy auto-catches all icon imports
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  const MockIcon = (name: string) => {
    const Icon = (props: Record<string, unknown>) => (
      <div
        data-testid={`${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-icon`}
        {...props}
      >
        {name}
      </div>
    );
    Icon.displayName = name;
    return Icon;
  };
  return new Proxy(actual as object, {
    get: (target, prop) => {
      if (typeof prop === 'string' && /^[A-Z]/.test(prop))
        return MockIcon(prop);
      return Reflect.get(target, prop);
    },
  });
});

test('active link has aria-current', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
    'aria-current',
    'page'
  );
});
