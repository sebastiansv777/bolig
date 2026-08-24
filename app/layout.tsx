import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BOLIG. — Selg boligen selv. Bare smartere.',
  description: 'Profesjonell teknologi for hele boligsalget – fra første vurdering til ferdig oppgjør.',
  generator: 'BOLIG.',
  metadataBase: new URL('https://bolig.no'),
  openGraph: {
    title: 'BOLIG. — Selg boligen selv. Bare smartere.',
    description: 'Boligsalg, gjort riktig.',
    type: 'website',
    locale: 'nb_NO',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light',
  themeColor: '#f7f7f5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
