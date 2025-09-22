'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/shared/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BackToTop } from '@/shared/components/common/back-to-top'
import { Navbar } from '@/shared/components/navigation/navbar'

export default function AppSidebarLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Single global header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Navbar onMobileMenuOpen={() => setMobileOpen(true)} />
        </div>
      </header>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-80 p-0 bg-background text-foreground border-r z-[60]">
          <VisuallyHidden asChild><SheetTitle>Navigation menu</SheetTitle></VisuallyHidden>
          <VisuallyHidden asChild><SheetDescription>Site sections and links</SheetDescription></VisuallyHidden>
          <SidebarContent isMobile onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside
          id="desktop-sidebar"
          className={cn(
            'relative border-r border-border bg-background hidden lg:block transition-all duration-300',
            collapsed ? 'w-[60px]' : 'w-[280px]'
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full bg-background shadow-md border border-border hover:bg-accent"
            onClick={() => setCollapsed(!collapsed)}
            aria-controls="desktop-sidebar"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
          <SidebarContent isMobile={false} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <footer className="py-6 px-6 text-center border-t bg-background/50 backdrop-blur">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Md Asif Bin Khaled.</p>
        <BackToTop />
      </footer>
    </div>
  )
}

function SidebarContent({ isMobile, onNavigate }: { isMobile: boolean; onNavigate?: () => void }) {
  // render your nav groups; call onNavigate?.() in mobile link onClick
  return <nav className="p-4">{/* links here */}</nav>
}
