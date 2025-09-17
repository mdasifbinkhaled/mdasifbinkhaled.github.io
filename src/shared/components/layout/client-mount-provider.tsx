'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface ClientMountProviderProps {
  children: ReactNode;
}

const ClientMountContext = createContext(false);

/**
 * Provides a simple mounted flag for components that need to know
 * when they are running on the client.
 */
export function ClientMountProvider({ children }: ClientMountProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ClientMountContext.Provider value={isMounted}>
      {children}
    </ClientMountContext.Provider>
  );
}

export function useClientMounted() {
  return useContext(ClientMountContext);
}
