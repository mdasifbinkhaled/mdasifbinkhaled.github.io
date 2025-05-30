import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Toaster } from "@/components/ui/toaster";
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    default: "Academic Assemblage - Md Asif Bin Khaled",
    template: "%s | Academic Assemblage",
  },
  description: "The professional portfolio of Md Asif Bin Khaled, showcasing research, experience, and publications.",
  keywords: ["Md Asif Bin Khaled", "academic portfolio", "research", "publications", "experience", "computer science", "machine learning", "software engineering"],
  authors: [{ name: "Md Asif Bin Khaled" }],
  openGraph: {
    title: "Academic Assemblage - Md Asif Bin Khaled",
    description: "The professional portfolio of Md Asif Bin Khaled.",
    type: "website",
    // url: "YOUR_DEPLOYED_URL_HERE", // Remember to set this on deployment
    // images: [{ url: "YOUR_OG_IMAGE_URL_HERE" }], // And this
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Assemblage - Md Asif Bin Khaled",
    description: "The professional portfolio of Md Asif Bin Khaled.",
    // images: ["YOUR_TWITTER_IMAGE_URL_HERE"], // And this
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon" className="border-r shadow-md" side="left">
            <SidebarHeader className="p-4 border-b border-sidebar-border">
              <Link href="/#about" className="flex items-center gap-3 text-xl font-semibold text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
                <GraduationCap className="h-8 w-8 text-sidebar-primary" />
                <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">Academic Assemblage</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2 flex-1"> {/* flex-1 to allow nav to take available space */}
              <SidebarNav />
            </SidebarContent>
            {/* You can add a SidebarFooter here if needed */}
          </Sidebar>
          <div className="flex flex-col flex-1 min-h-screen"> {/* Ensure main content area can grow and has min height */}
            <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:hidden">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <GraduationCap className="h-6 w-6" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarTrigger>
              <Link href="/#about" className="flex items-center gap-2 text-lg font-semibold md:hidden">
                <span className="font-bold">Academic Assemblage</span>
              </Link>
            </header>
            <SidebarInset className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
