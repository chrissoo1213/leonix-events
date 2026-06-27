import { LanguageProvider } from '@/components/language-provider'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'


const inter = Inter({ 
  variable: '--font-geist-sans', 
  subsets: ['latin'],
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'LEONIX EVENTS | Temporary Internet Solutions for Mission-Critical Events',
  description: 'Professional telecom operator providing temporary connectivity solutions for events in France and internationally. Fiber, Satellite, 4G/5G Aggregation, WiFi, VoIP and Network Infrastructure.',
  keywords: ['event internet', 'temporary connectivity', 'fiber optic events', 'event wifi', '4G 5G aggregation', 'satellite internet', 'Paris Fashion Week', 'event telecommunications'],
  authors: [{ name: 'LEONIX EVENTS' }],
  icons: {
    icon: '/logo_leonix.png',
    shortcut: '/logo_leonix.png',
    apple: '/logo_leonix.png',
  },
  openGraph: {
    title: 'LEONIX EVENTS | Temporary Internet Solutions for Mission-Critical Events',
    description: 'Professional telecom operator providing temporary connectivity solutions for events in France and internationally.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEONIX EVENTS | Temporary Internet Solutions',
    description: 'Fiber, Satellite, 4G/5G Aggregation, WiFi, VoIP for Professional Events',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <LanguageProvider>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        </body>
      </LanguageProvider>
    </html>
  )
}
