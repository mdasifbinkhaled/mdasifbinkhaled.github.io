"use client"

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackToTopProps {
  className?: string
  threshold?: number
  smooth?: boolean
  showLabel?: boolean
}

export function BackToTop({ 
  className, 
  threshold = 400,
  smooth = true,
  showLabel = false
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  const checkScrollTop = () => {
    if (!isVisible && window.scrollY > threshold) {
      setIsVisible(true)
    } else if (isVisible && window.scrollY <= threshold) {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  })

  return (
    <Button
      variant="secondary"
      size={showLabel ? "default" : "icon"}
      className={cn(
        "fixed bottom-6 right-6 z-50 shadow-md transition-opacity duration-300 focus:ring-2 focus:ring-primary",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
      {showLabel && <span className="ml-2">Back to top</span>}
    </Button>
  )
}