'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-900">
          <div className="text-center space-y-6 max-w-md">
            <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Critical Error</h1>
              <p className="text-gray-600 dark:text-gray-400">
                A critical error occurred. Please refresh the page to continue.
              </p>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {error.message}
                </p>
              </div>
            )}
            <button 
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
