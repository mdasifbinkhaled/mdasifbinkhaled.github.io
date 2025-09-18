import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { AppProviders } from '@/shared/providers/app-providers';
import { assetPaths } from '@/shared/config/assets';
import './globals.css';

export const metadata: Metadata = {
  title: 'Md Asif Bin Khaled',
  description: 'Portfolio',
  metadataBase: new URL('https://mdasifbinkhaled.github.io'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Md Asif Bin Khaled',
    images: [assetPaths.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div id="root">
          <AppProviders>{children}</AppProviders>
        </div>
      </body>
    </html>
  );
}
