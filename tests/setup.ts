import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';

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
    Copy: createMockIcon('copy'),
    Search: createMockIcon('search'),
    Filter: createMockIcon('filter'),
    RefreshCw: createMockIcon('refresh-cw'),

    // Contact icons
    Mail: createMockIcon('mail'),
    Send: createMockIcon('send'),
    Phone: createMockIcon('phone'),
    Github: createMockIcon('github'),
    Linkedin: createMockIcon('linkedin'),
    Smartphone: createMockIcon('smartphone'),

    // Academic icons
    Code2: createMockIcon('code2'),
    Presentation: createMockIcon('presentation'),
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
    UserCircle: createMockIcon('user-circle'),
    BookUser: createMockIcon('book-user'),
    MapPin: createMockIcon('map-pin'),
    Book: createMockIcon('book'),
    Newspaper: createMockIcon('newspaper'),
    Clipboard: createMockIcon('clipboard'),

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
    Radio: createMockIcon('radio'),
    Heart: createMockIcon('heart'),
    Scroll: createMockIcon('scroll'),
    Globe: createMockIcon('globe'),
    Clock: createMockIcon('clock'),
    Target: createMockIcon('target'),
    Trophy: createMockIcon('trophy'),
    FlaskConical: createMockIcon('flask-conical'),
    Star: createMockIcon('star'),
    Medal: createMockIcon('medal'),
    ShieldCheck: createMockIcon('shield-check'),
    Activity: createMockIcon('activity'),
    Eye: createMockIcon('eye'),
    Satellite: createMockIcon('satellite'),
    Video: createMockIcon('video'),
    MessageCircle: createMockIcon('message-circle'),
    CheckCircle: createMockIcon('check-circle'),
    ClipboardList: createMockIcon('clipboard-list'),
    AlertCircle: createMockIcon('alert-circle'),
  };
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
