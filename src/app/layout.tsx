import type {Metadata} from 'next'

import '../config/globals.css'
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
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
      <body className="antialiased">{children}</body>
    </html>
  )
}
