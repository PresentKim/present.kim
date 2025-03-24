import type {Metadata} from 'next'
import Script from 'next/script'
import '../config/globals.css'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import {
  siteDomain,
  siteName,
  siteDescription,
  siteThumbnail,
} from '@/config/metadata'

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: siteDescription,
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
    google: 'HqrZUQIewwXecddUtTC35Y4fXer5RwH-RDZPx10qjnw',
    other: {
      'naver-site-verification': '1ed210872e2a04db6c5c02ee7a568183db6f2629',
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
          id="color-scheme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {
    const isDarkMatchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  function loadColorScheme() {
    let colorScheme = localStorage.getItem('color-scheme')
    if (colorScheme !== 'dark' && colorScheme !== 'light') {
      colorScheme = isDarkMatchMedia.matches ? 'dark' : 'light'
    }
    document.documentElement.dataset['theme'] = colorScheme
  }

  isDarkMatchMedia.addEventListener('change', loadColorScheme)
  loadColorScheme()
})()`,
          }}
        />
      </head>
      <body className="flex max-w-full flex-col">
        <Header />
        <main className="w-full flex-1 p-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
