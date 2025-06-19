
"use client";

import { type ReactNode } from 'react';
import { AppProviders } from './app-providers';

interface MainLayoutClientProps {
  children: ReactNode;
}

/**
 * Main layout client component - simplified to use composition pattern
 * @deprecated Consider using AppProviders directly in your layout
 */
export function MainLayoutClient({ children }: MainLayoutClientProps) {
  return <AppProviders>{children}</AppProviders>;
}
