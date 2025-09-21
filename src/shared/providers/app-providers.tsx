'use client'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
