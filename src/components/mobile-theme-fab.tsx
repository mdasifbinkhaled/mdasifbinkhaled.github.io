'use client'

import { ThemeSelector } from '@/components/ui/theme-selector'
import { useIsMobile } from '@/hooks/use-mobile'

export function MobileThemeFAB() {
  const isMobile = useIsMobile()

  // Only show on mobile devices
  if (!isMobile) {
    return null
  }

  return (
    <ThemeSelector variant="floating" align="start" />
  )
}
