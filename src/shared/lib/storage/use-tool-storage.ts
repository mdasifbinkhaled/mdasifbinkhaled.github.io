'use client';

// ────────────────────────────────────────────────
// useToolStorage — namespaced, SSR-safe persisted state
// ────────────────────────────────────────────────
// A thin wrapper around the existing `usePersistedState` hook that:
//   1. scopes keys under `abk:v1:<tool>:<key>`,
//   2. runs one-time legacy migrations on mount (if registered), and
//   3. preserves the same `[value, setValue, { ready }]` API.
//
// The original `usePersistedState` remains available for non-tool callers
// (notably `src/shared/hooks/use-persisted-state.ts`).

import { useEffect } from 'react';
import { usePersistedState } from '@/shared/hooks/use-persisted-state';
import { buildKey } from './namespaced';
import { migrateTool, LEGACY_MIGRATIONS } from './migrate';

export function useToolStorage<T>(
  tool: string,
  key: string,
  defaultValue: T
): ReturnType<typeof usePersistedState<T>> {
  // Run legacy migration exactly once per tool per session. Idempotent via
  // the sentinel key inside `migrateTool`.
  useEffect(() => {
    const mapping = LEGACY_MIGRATIONS[tool];
    if (mapping && mapping.length > 0) migrateTool(tool, mapping);
  }, [tool]);

  return usePersistedState<T>(buildKey(tool, key), defaultValue);
}
