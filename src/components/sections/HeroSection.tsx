import Link from 'next/link'
import { ArrowRight, Sun, Zap, Droplets } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Cercles décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div>
            <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Sun size={16} />
              Énergie Solaire au Cameroun
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              L&apos;énergie du soleil,{' '}
              <span className="text-amber-400">au service de votre avenir</span>
            </h1>

            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              {SITE.name} — votre expert en installations solaires, pompage solaire
              et équipements solaires au Cameroun. Des solutions durables et rentables
              pour particuliers et entreprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Demander un devis gratuit
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg border border-white/20"
              >
                Voir nos produits
              </Link>
            </div>

            {/* Badges services */}
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { icon: Sun, label: 'Installations Solaires' },
                { icon: Droplets, label: 'Pompage Solaire' },
                { icon: Zap, label: 'Lampadaires Solaires' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm">
                  <Icon size={16} className="text-amber-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Illustration placeholder — sera remplacé par une vraie image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="w-80 h-80 bg-amber-500/20 rounded-full flex items-center justify-center">
              <div className="w-60 h-60 bg-amber-500/30 rounded-full flex items-center justify-center">
                <Sun size={100} className="text-amber-400" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
              ✓ Devis Gratuit
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
