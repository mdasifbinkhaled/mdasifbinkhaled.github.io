'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <head>
        {/* global-error replaces the entire <html>, so theme tokens and
            Tailwind utilities are unavailable. Inline styles with
            prefers-color-scheme keep it accessible in both modes. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { color-scheme: light dark; }
              body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
              .ge-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; background: #fff; color: #111; }
              .ge-icon-ring { width: 4rem; height: 4rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: #fef2f2; }
              .ge-title { font-size: 1.5rem; font-weight: 700; margin: 0; }
              .ge-body { color: #555; margin: 0; }
              .ge-debug { padding: 1rem; border-radius: 0.5rem; text-align: left; font-family: monospace; font-size: 0.875rem; background: #f3f4f6; color: #374151; }
              .ge-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #2563eb; color: #fff; border: none; border-radius: 0.5rem; font-weight: 500; font-size: 1rem; cursor: pointer; transition: background 0.15s; }
              .ge-btn:hover { background: #1d4ed8; }
              @media (prefers-color-scheme: dark) {
                .ge-wrap { background: #111; color: #f3f4f6; }
                .ge-icon-ring { background: rgba(127,29,29,0.2); }
                .ge-body { color: #9ca3af; }
                .ge-debug { background: #1f2937; color: #d1d5db; }
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="ge-wrap">
          <div
            style={{
              textAlign: 'center',
              maxWidth: '28rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div className="ge-icon-ring">
              <AlertTriangle
                style={{ width: '2rem', height: '2rem', color: '#dc2626' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <h1 className="ge-title">Critical Error</h1>
              <p className="ge-body">
                A critical error occurred. Please refresh the page to continue.
              </p>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="ge-debug">{error.message}</div>
            )}
            <div>
              <button onClick={reset} className="ge-btn">
                <RefreshCw style={{ width: '1rem', height: '1rem' }} />
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
