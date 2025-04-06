import type {Metadata} from 'next'
import Script from 'next/script'
import './(resources)/globals.css'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import {
  siteDomain,
  siteName,
  siteDescription,
  siteThumbnail,
  gtag,
  verifications,
} from '@/lib/metadata'
import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  summary: siteDescription,
  openGraph: {
    title: {
      template: '%s | ${siteName}',
      default: siteName,
    },
    description: siteDescription,
    type: 'website',
    images: [{url: siteDomain + siteThumbnail}],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | ${siteName}',
      default: siteName,
    },
    description: siteDescription,
    images: [{url: siteDomain + siteThumbnail}],
  },
  verification: {
    google: verifications.google,
    other: {
      'naver-site-verification': verifications.naver,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </head>
      <body className="flex max-w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-between p-4">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
