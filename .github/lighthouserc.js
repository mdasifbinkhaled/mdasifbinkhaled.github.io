module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: [
        'http://localhost/',
        'http://localhost/about/',
        'http://localhost/publications/',
        'http://localhost/research/',
        'http://localhost/teaching/',
        'http://localhost/contact/',
        'http://localhost/apps/',
        'http://localhost/cv/',
      ],
      numberOfRuns: 1,
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Static export: no server to preload LCP images or lazy-load them
        'lcp-lazy-loaded': 'off',
        'prioritize-lcp-image': 'off',
        // CSS animations from Tailwind transitions — non-critical
        'non-composited-animations': 'off',
        // Unused JS: Next.js runtime includes shared chunks across pages
        'unused-javascript': 'off',
        // Console errors from RSC prefetch on local static server
        'errors-in-console': 'off',
        // bf-cache: controlled by Next.js client runtime, not fixable
        'bf-cache': 'off',
        // aria-allowed-role: axe version difference between Lighthouse and npm
        'aria-allowed-role': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
