import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import { AppProviders } from '@/shared/providers/app-providers';
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout';
import { SkipLink } from '@/shared/components/common/skip-link';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import {
  generatePersonStructuredData,
  sanitizeJsonLd,
} from '@/shared/lib/structured-data';
import { RouteAnnouncer } from '@/shared/components/common/route-announcer';
import { WebVitalsReporter } from '@/shared/components/common/web-vitals-reporter';
import '@/app/globals.css';
import '@/styles/tokens.css';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Analytics configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

export const metadata: Metadata = {
  title: siteConfig.author,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.author,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [assetPaths.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.author,
    description: siteConfig.description,
    images: [assetPaths.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = generatePersonStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com; frame-src 'self' https://www.youtube.com;"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {/* JSON-LD Structured Data — sanitized to prevent XSS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd) }}
        />

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
        <WebVitalsReporter />

        <SkipLink />
        <RouteAnnouncer />
        <AppProviders>
          <AppSidebarLayout>{children}</AppSidebarLayout>
        </AppProviders>
      </body>
    </html>
  );
}
