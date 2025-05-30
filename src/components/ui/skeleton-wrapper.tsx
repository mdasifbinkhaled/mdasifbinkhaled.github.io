"use client"

import * as React from "react"
import { useTheme } from 'next-themes'
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  children: React.ReactNode
  shimmer?: boolean
  as?: React.ElementType
  skeletonClassName?: string
  skeletonProps?: React.HTMLAttributes<HTMLDivElement>
}

export function SkeletonWrapper({
  isLoading = false,
  children,
  shimmer = true,
  as: Comp = "div",
  className,
  skeletonClassName,
  skeletonProps,
  ...props
}: SkeletonWrapperProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  if (isLoading) {
    return (
      <Comp
        className={cn(
          shimmer && 
            "relative after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-background/30 after:to-transparent",
          className
        )}
        {...props}
      >
        <Skeleton 
          className={cn("h-full w-full rounded-md", 
            isDark ? "bg-muted/60" : "bg-muted", 
            skeletonClassName
          )}
          {...skeletonProps}
        />
      </Comp>
    )
  }

  return <Comp className={className} {...props}>{children}</Comp>
}