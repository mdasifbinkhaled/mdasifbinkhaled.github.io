import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Toaster } from "@/components/ui/toaster";
import { GraduationCap, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { FooterYear } from '@/components/footer-year';
import { MotionDiv } from '@/components/motion-div'; // For Framer Motion page transitions

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.links.twitter.split('/').pop()}`,
  },
  icons: {
    icon: "/favicon.ico", // Make sure you have a favicon.ico in /public
  },
  manifest: `${siteConfig.url}/site.webmanifest`, // Make sure you have a site.webmanifest
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={true}>
            <Sidebar collapsible="icon" className="border-r shadow-md bg-sidebar text-sidebar-foreground" side="left">
              <SidebarHeader className="p-4 border-b border-sidebar-border">
                <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
                  <GraduationCap className="h-8 w-8 text-sidebar-primary" />
                  <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">{siteConfig.shortName}</span>
                </Link>
              </SidebarHeader>
              <SidebarContent className="p-2 flex-1">
                <SidebarNav />
              </SidebarContent>
              {/* You can add a SidebarFooter here if needed */}
            </Sidebar>
            <div className="flex flex-col flex-1 min-h-screen">
              <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:hidden">
                <SidebarTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </SidebarTrigger>
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:hidden text-foreground">
                  <span className="font-bold">{siteConfig.shortName}</span>
                </Link>
              </header>
              <SidebarInset className="flex-1 overflow-y-auto">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 md:p-6 lg:p-8"
                >
                  {children}
                </MotionDiv>
              </SidebarInset>
               <footer className="py-6 px-4 md:px-6 lg:px-8 text-center border-t bg-background">
                <p className="text-sm text-muted-foreground">
                  &copy; <FooterYear /> {siteConfig.author}. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Built with Next.js, Tailwind CSS, and ShadCN UI.
                </p>
              </footer>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
