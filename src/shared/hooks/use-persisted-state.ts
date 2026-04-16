'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * A localStorage-backed useState that is SSR-safe.
 * Returns `[value, setValue, { ready }]`.
 *
 * `ready` is false during SSR / before hydration so callers can
 * render a placeholder (or null) instead of stale defaults.
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (v: T | ((prev: T) => T)) => void, { ready: boolean }] {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<T>(defaultValue);
  const keyRef = useRef(key);

  // Keep ref in sync via effect (not during render)
  useEffect(() => {
    keyRef.current = key;
  }, [key]);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(raw) as T);
      }
    } catch {
      // corrupt data — fall back to default
    }
    setReady(true);
  }, [key]);

  // Persist whenever state changes (skip first render before hydration)
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(keyRef.current, JSON.stringify(state));
      } catch {
        // storage full — silently ignore
      }
    }
  }, [state, ready]);

  const setValue = useCallback((v: T | ((prev: T) => T)) => {
    setState(v);
  }, []);

  return [state, setValue, { ready }];
}
