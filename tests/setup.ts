import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';

// Mock @radix-ui/react-dialog
vi.mock('@radix-ui/react-dialog', () => {
  const React = require('react');

  return {
    Root: ({ children, open, ...props }: any) => {
      // Pass the open state down through context or data attribute
      return React.createElement(
        'div',
        {
          'data-testid': 'dialog-root',
          'data-open': open?.toString(),
          style: { display: open ? 'block' : 'none' },
          ...props,
        },
        children
      );
    },
    Portal: ({ children, ...props }: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'dialog-portal', ...props },
        children
      ),
    Overlay: ({ children, ...props }: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'dialog-overlay', ...props },
        children
      ),
    Content: ({ children, ...props }: any) => {
      return React.createElement(
        'div',
        {
          role: 'dialog',
          'data-testid': 'dialog-content',
          'aria-labelledby': 'dialog-title',
          ...props,
        },
        children
      );
    },
    Close: ({ children, ...props }: any) =>
      React.createElement(
        'button',
        { 'data-testid': 'dialog-close', ...props },
        children
      ),
    Title: ({ children, ...props }: any) =>
      React.createElement(
        'h2',
        { id: 'dialog-title', 'data-testid': 'dialog-title', ...props },
        children
      ),
    Description: ({ children, ...props }: any) =>
      React.createElement(
        'p',
        { 'data-testid': 'dialog-description', ...props },
        children
      ),
    Trigger: ({ children, ...props }: any) =>
      React.createElement(
        'button',
        { 'data-testid': 'dialog-trigger', ...props },
        children
      ),
  };
});
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

// Mock Radix UI components
vi.mock('@radix-ui/react-dialog', () => {
  const React = require('react');
  const mockComponent = ({ children, ...props }: any) =>
    React.createElement('div', props, children);
  return {
    Root: mockComponent,
    Trigger: ({ children, ...props }: any) =>
      React.createElement(
        'button',
        { 'data-testid': 'dialog-trigger', ...props },
        children
      ),
    Portal: mockComponent,
    Overlay: mockComponent,
    Content: mockComponent,
    Close: ({ children, ...props }: any) =>
      React.createElement(
        'button',
        { 'data-testid': 'dialog-close', ...props },
        children
      ),
    Title: ({ children, ...props }: any) =>
      React.createElement(
        'h2',
        { 'data-testid': 'dialog-title', ...props },
        children
      ),
    Description: ({ children, ...props }: any) =>
      React.createElement(
        'p',
        { 'data-testid': 'dialog-description', ...props },
        children
      ),
  };
});

vi.mock('@radix-ui/react-visually-hidden', () => {
  const React = require('react');
  return {
    VisuallyHidden: ({ children, ...props }: any) =>
      React.createElement(
        'span',
        {
          'data-testid': 'visually-hidden',
          style: { position: 'absolute', left: '-10000px' },
          ...props,
        },
        children
      ),
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => {
  const React = require('react');
  const createMockIcon = (name: string) => (props: any) =>
    React.createElement('svg', {
      'data-testid': `${name.toLowerCase()}-icon`,
      ...props,
    });

  return {
    // Theme icons
    Sun: createMockIcon('sun'),
    Moon: createMockIcon('moon'),
    Palette: createMockIcon('palette'),

    // Navigation icons
    GraduationCap: createMockIcon('graduation-cap'),
    Menu: createMockIcon('menu'),
    Home: createMockIcon('home'),
    ChevronUp: createMockIcon('chevron-up'),
    ChevronDown: createMockIcon('chevron-down'),
    ChevronLeft: createMockIcon('chevron-left'),
    ChevronRight: createMockIcon('chevron-right'),
    ArrowUp: createMockIcon('arrow-up'),
    ArrowRight: createMockIcon('arrow-right'),

    // Content icons
    ExternalLink: createMockIcon('external-link'),
    ExternalLinkIcon: createMockIcon('external-link-icon'),
    FileText: createMockIcon('file-text'),
    BookOpen: createMockIcon('book-open'),
    BookOpenText: createMockIcon('book-open-text'),
    Download: createMockIcon('download'),

    // Action icons
    X: createMockIcon('x'),
    Check: createMockIcon('check'),
    Search: createMockIcon('search'),
    Filter: createMockIcon('filter'),
    RefreshCw: createMockIcon('refresh-cw'),

    // Contact icons
    Mail: createMockIcon('mail'),
    Phone: createMockIcon('phone'),
    Github: createMockIcon('github'),
    Linkedin: createMockIcon('linkedin'),
    Smartphone: createMockIcon('smartphone'),

    // Academic icons
    Code2: createMockIcon('code2'),
    Brain: createMockIcon('brain'),
    Database: createMockIcon('database'),
    Calculator: createMockIcon('calculator'),
    Server: createMockIcon('server'),
    Lightbulb: createMockIcon('lightbulb'),
    Telescope: createMockIcon('telescope'),
    Zap: createMockIcon('zap'),
    Banknote: createMockIcon('banknote'),
    Sigma: createMockIcon('sigma'),
    Award: createMockIcon('award'),
    CalendarCheck2: createMockIcon('calendar-check2'),
    Calendar: createMockIcon('calendar'),
    Building2: createMockIcon('building2'),
    Users: createMockIcon('users'),
    User: createMockIcon('user'),
    BookUser: createMockIcon('book-user'),
    MapPin: createMockIcon('map-pin'),

    // Status icons
    AlertTriangle: createMockIcon('alert-triangle'),
    Circle: createMockIcon('circle'),

    // Tech icons
    Layers: createMockIcon('layers'),
    Code: createMockIcon('code'),
    Cpu: createMockIcon('cpu'),
    Wrench: createMockIcon('wrench'),

    // Nature/Theme icons
    Waves: createMockIcon('waves'),
    Coffee: createMockIcon('coffee'),
    Trees: createMockIcon('trees'),
    Sunset: createMockIcon('sunset'),
    Sparkles: createMockIcon('sparkles'),
    Shield: createMockIcon('shield'),
    Crown: createMockIcon('crown'),
    Flame: createMockIcon('flame'),
    Leaf: createMockIcon('leaf'),
    CloudMoon: createMockIcon('cloudmoon'),
    Sunrise: createMockIcon('sunrise'),
    Flower: createMockIcon('flower'),
    Briefcase: createMockIcon('briefcase'),
    Heart: createMockIcon('heart'),
    Scroll: createMockIcon('scroll'),
    Globe: createMockIcon('globe'),
  };
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
