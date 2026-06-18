export const dynamic = 'force-dynamic'
export const revalidate = 0

import Navbar from '@/components/layout/Navbar'
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
