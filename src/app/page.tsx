export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: `${SITE.name} — Installations Solaires au Cameroun`,
  description: 'New Energy Technology SARL : installation solaire, pompage solaire, lampadaires solaires, vidéosurveillance et électricité au Cameroun. Devis gratuit. Intervention à Yaoundé, Douala et partout au Cameroun.',
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.name} — Installations Solaires au Cameroun`,
    description: 'Spécialiste en énergie solaire, pompage solaire et vidéosurveillance au Cameroun. Devis gratuit sous 24h.',
    url: SITE.url,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'New Energy Technology SARL' }],
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE.url,
  name: SITE.name,
  alternateName: SITE.shortName,
  description: 'Spécialiste en installations solaires, pompage solaire, vidéosurveillance et électricité au Cameroun.',
  url: SITE.url,
  logo: `${SITE.url}/logo.jpg`,
  image: `${SITE.url}/og-image.jpg`,
  telephone: ['+237691287852', '+237677659959', '+237678067592', '+237693396362'],
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Yaoundé',
    addressCountry: 'CM',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 3.848,
    longitude: 11.502,
  },
  areaServed: { '@type': 'Country', name: 'Cameroun' },
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
  ],
  sameAs: [
    'https://facebook.com/newenergytech',
    'https://instagram.com/newenergytech',
    'https://linkedin.com/company/newenergytech',
  ],
}

import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProduitsVedette from '@/components/sections/ProduitsVedette'
import RealisationsVedette from '@/components/sections/RealisationsVedette'
import BlogPreview from '@/components/sections/BlogPreview'
import CTASection from '@/components/sections/CTASection'
import StatsSection from '@/components/sections/StatsSection'

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ProduitsVedette />
        <RealisationsVedette />
        <CTASection />
        <BlogPreview />
      </main>
      <Footer />
    </>
  )
}
