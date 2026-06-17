'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { SITE, IMAGES } from '@/lib/constants'

const slides = [
  {
    image: IMAGES.heroPanneaux,
    titre: "Installations Solaires Professionnelles",
    sous_titre: "Panneaux solaires haute performance installés par nos experts au Cameroun",
    cta_label: "Demander un devis gratuit",
    cta_href: '/contact',
  },
  {
    image: IMAGES.heroPompage,
    titre: "Pompage Solaire Sans Coupure",
    sous_titre: "Alimentation en eau garantie 24h/24 pour agriculture, foyers et collectivités",
    cta_label: "Découvrir le pompage solaire",
    cta_href: '/services#pompage',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  const slide = slides[current]

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={s.image}
              alt={s.titre}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#B83232]/90 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            New Energy Technology SARL — Cameroun
          </div>

          {/* Titre animé */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            {slide.titre}
          </h1>

          <p className="text-blue-100 text-lg mb-8 max-w-xl leading-relaxed">
            {slide.sous_titre}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={slide.cta_href}
              className="inline-flex items-center justify-center gap-2 bg-[#B83232] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg"
            >
              {slide.cta_label} <ArrowRight size={20} />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/\s|\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg"
            >
              <Phone size={20} /> WhatsApp
            </a>
          </div>

          {/* Stats rapides */}
          <div className="flex flex-wrap gap-6 mt-12">
            {[
              { v: '500+', l: 'Installations' },
              { v: '10 ans', l: 'Expérience' },
              { v: '100%', l: 'Satisfaction' },
            ].map(({ v, l }) => (
              <div key={l} className="text-white">
                <p className="text-2xl font-bold text-[#F59E0B]">{v}</p>
                <p className="text-xs text-blue-200 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contrôles slider */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <button onClick={prev} className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#B83232]' : 'w-4 bg-white/40'}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
