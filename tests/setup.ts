import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

// React import for test components
import React from 'react';

// Mock window.matchMedia for next-themes
beforeAll(() => {
  vi.useRealTimers();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock missing DOM APIs for Radix UI components
  Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
    value: vi.fn(() => false),
    writable: true,
  });

  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    value: vi.fn(() => {}),
    writable: true,
  });

  Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
    value: vi.fn(() => {}),
    writable: true,
  });

  Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
    value: vi.fn(() => {}),
    writable: true,
  });

  // Mock ResizeObserver
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver =
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

  // Mock IntersectionObserver
  (
    global as unknown as { IntersectionObserver: unknown }
  ).IntersectionObserver = class IntersectionObserver {
    root = null;
    rootMargin = '';
    thresholds = [];

    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
});

// Mock lucide-react icons — Proxy-based so ANY icon import works automatically.
// No more manual enumeration; adding/removing icons from the app never breaks tests.
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  const createMockIcon = (name: string) => {
    const MockIcon = (props: Record<string, unknown>) =>
      React.createElement('svg', {
        'data-testid': `${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-icon`,
        ...props,
      });
    MockIcon.displayName = name;
    return MockIcon;
  };

  return new Proxy(actual, {
    get: (target, prop) => {
      if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
        return createMockIcon(prop);
      }
      return Reflect.get(target, prop);
    },
  });
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
