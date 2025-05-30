
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { FooterYear } from '@/components/footer-year';
import { MotionDiv } from '@/components/motion-div';
import { Navbar } from '@/components/navbar';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { mainNavItems } from '@/config/navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { ClientOnly } from '@/components/client-only'; // Import ClientOnly

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
    icon: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
        <ClientOnly>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <div className="flex min-h-screen">
                <Sidebar collapsible="icon" side="left" className="hidden md:flex border-r shadow-md bg-sidebar text-sidebar-foreground">
                  <SidebarHeader className="p-4 border-b border-sidebar-border flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-2">
                      <GraduationCap className="h-7 w-7 text-sidebar-primary flex-shrink-0" />
                      <span className="font-bold text-lg text-sidebar-foreground group-data-[state=collapsed]:hidden whitespace-nowrap">
                        {siteConfig.shortName}
                      </span>
                    </Link>
                  </SidebarHeader>
                  <SidebarContent className="p-2">
                    <SidebarNav items={mainNavItems} />
                  </SidebarContent>
                </Sidebar>
                <SidebarInset className="flex flex-col flex-1">
                  <Navbar />
                  <main className="flex-1">
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="container mx-auto p-4 md:p-6 lg:p-8"
                    >
                      {children}
                    </MotionDiv>
                  </main>
                  <footer className="py-6 px-4 md:px-6 lg:px-8 text-center border-t bg-background">
                    <p className="text-sm text-muted-foreground">
                      &copy; <FooterYear /> {siteConfig.author}. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Built with Next.js, Tailwind CSS, and ShadCN UI.
                    </p>
                  </footer>
                </SidebarInset>
              </div>
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
