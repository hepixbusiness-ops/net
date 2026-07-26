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
  description: 'New Energy Technology SARL — Spécialiste en installations solaires, pompage solaire, vidéosurveillance et électricité au Cameroun. Devis gratuit, intervention rapide à Yaoundé et dans tout le pays.',
  keywords: [
    'énergie solaire cameroun', 'installation solaire yaoundé', 'pompage solaire cameroun',
    'lampadaires solaires', 'panneaux solaires cameroun', 'vidéosurveillance yaoundé',
    'New Energy Technology', 'NET solaire', 'électricité cameroun', 'onduleur cameroun',
    'kit solaire cameroun', 'batterie solaire', 'maintenance solaire cameroun',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.slogan}`,
    description: 'Spécialiste en installations solaires, pompage solaire, vidéosurveillance et électricité au Cameroun. Devis gratuit.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'New Energy Technology SARL — Énergie Solaire Cameroun' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.slogan}`,
    description: 'Spécialiste en installations solaires, pompage solaire et équipements solaires au Cameroun.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    google: 'ZE6t3Cp_mTyq5vRL9MSbtdye5SFoZvrbdDSDwBYIVas',
  },
  other: {
    'google-site-verification': 'ZE6t3Cp_mTyq5vRL9MSbtdye5SFoZvrbdDSDwBYIVas',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <meta name="google-site-verification" content="ZE6t3Cp_mTyq5vRL9MSbtdye5SFoZvrbdDSDwBYIVas" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
