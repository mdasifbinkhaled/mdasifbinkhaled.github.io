import type { Metadata } from 'next';
import { AppProviders } from '@/shared/providers/app-providers';
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout';
import { SkipLink } from '@/shared/components/common/skip-link';
import { assetPaths } from '@/shared/config/assets';
import '@/app/globals.css';
import '@/styles/tokens.css';

export const metadata: Metadata = {
  title: 'Md Asif Bin Khaled',
  description: 'Portfolio of Md Asif Bin Khaled',
  metadataBase: new URL('https://mdasifbinkhaled.github.io'),
  alternates: { canonical: '/' },
  openGraph: { title: 'Md Asif Bin Khaled', images: [assetPaths.ogImage] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <SkipLink />
        <AppProviders>
          <AppSidebarLayout>{children}</AppSidebarLayout>
        </AppProviders>
      </body>
    </html>
  );
}
