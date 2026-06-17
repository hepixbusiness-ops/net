import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.slogan}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['énergie solaire cameroun', 'installation solaire', 'pompage solaire', 'lampadaires solaires', 'New Energy Technology'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
