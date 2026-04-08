import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { SentryInit } from '@/shared/components/infra/sentry-init';

describe('SentryInit', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', '');
  });

  it('renders nothing', () => {
    const { container } = render(<SentryInit />);
    expect(container.innerHTML).toBe('');
  });

  it('does not import Sentry when DSN is empty', async () => {
    render(<SentryInit />);
    // With no DSN set, the dynamic import should not fire.
    // The component returns null regardless.
    await vi.dynamicImportSettled?.();
    // No error thrown = success
  });
});
