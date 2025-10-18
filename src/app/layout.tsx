import type { Metadata } from 'next';
import Script from 'next/script';
import { AppProviders } from '@/shared/providers/app-providers';
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout';
import { SkipLink } from '@/shared/components/common/skip-link';
import { assetPaths } from '@/shared/config/assets';
import '@/app/globals.css';
import '@/styles/tokens.css';

// Analytics configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

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
      <body
        className="font-sans antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        {/* Google Analytics 4 - Only loads if configured */}
        {ANALYTICS_ENABLED && GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <SkipLink />
        <AppProviders>
          <AppSidebarLayout>{children}</AppSidebarLayout>
        </AppProviders>
      </body>
    </html>
  );
}
