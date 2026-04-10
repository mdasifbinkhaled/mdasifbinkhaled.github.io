module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: [
        'http://localhost/',
        'http://localhost/about/',
        'http://localhost/apps/',
        'http://localhost/blog/',
        'http://localhost/contact/',
        'http://localhost/cv/',
        'http://localhost/experience/',
        'http://localhost/publications/',
        'http://localhost/research/',
        'http://localhost/service/',
        'http://localhost/service-awards/',
        'http://localhost/talks/',
        'http://localhost/teaching/',
      ],
      numberOfRuns: 3,
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
        // bf-cache: controlled by Next.js client runtime, not fixable
        'bf-cache': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
