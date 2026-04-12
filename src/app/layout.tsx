import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AppProviders } from '@/shared/providers/app-providers';
import AppSidebarLayout from '@/shared/components/layout/app-sidebar-layout';
import { SkipLink } from '@/shared/components/infra/skip-link';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import {
  generatePersonStructuredData,
  sanitizeJsonLd,
} from '@/shared/lib/structured-data';
import { RouteAnnouncer } from '@/shared/components/infra/route-announcer';
import { WebVitalsReporter } from '@/shared/components/infra/web-vitals-reporter';
import { SentryInit } from '@/shared/components/infra/sentry-init';
import '@/app/globals.css';
import '@/styles/tokens.css';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
        {/*
          CSP rationale (static-export site, no server-side nonce support):
          - 'unsafe-inline' scripts: required by Next.js hydration + GA gtag inline snippet
          - 'unsafe-inline' styles: required by next/font inline injection + Tailwind runtime
          - img-src whitelist: self, data: (SVG inlining), blob: (canvas export), and
            specific CDNs used for profile/OG images
          These are acceptable trade-offs for a static portfolio site.
        */}
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://scholar.googleusercontent.com https://avatars.githubusercontent.com; font-src 'self'; worker-src 'self'; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.ingest.sentry.io; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self';"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* JSON-LD Structured Data — sanitized to prevent XSS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd) }}
        />

        {/* Google Analytics 4 via Next.js standard third-party wrapper */}
        {ANALYTICS_ENABLED && GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        )}
        <WebVitalsReporter />
        <SentryInit />

        <SkipLink />
        <RouteAnnouncer />
        <AppProviders>
          <AppSidebarLayout>{children}</AppSidebarLayout>
        </AppProviders>
      </body>
    </html>
  );
}
