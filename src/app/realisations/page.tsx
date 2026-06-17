import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { IMAGES, TYPES_PROJET } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Réalisations — Projets Solaires au Cameroun',
  description: 'Découvrez les projets d\'installation solaire et de pompage solaire réalisés par New Energy Technology SARL au Cameroun.',
}

export default async function RealisationsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const typeActif = params.type

  let query = (supabase as any).from('realisations').select('*').eq('actif', true).order('date_realisation', { ascending: false })
  if (typeActif) query = query.eq('type_projet', typeActif)

  const { data: realisations } = await query

  const typeLabels: Record<string, string> = Object.fromEntries(TYPES_PROJET.map(t => [t.id, t.label]))

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="relative bg-[#1E3A5F] text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src={IMAGES.heroPompage} alt="" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Nos Réalisations</h1>
            <p className="text-blue-200">Projets solaires réalisés à travers le Cameroun</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filtres */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/realisations"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!typeActif ? 'bg-[#B83232] text-white' : 'bg-white text-gray-600 hover:bg-red-50 border border-gray-200'}`}>
              Tous les projets
            </Link>
            {TYPES_PROJET.map((t) => (
              <Link key={t.id} href={`/realisations?type=${t.id}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${typeActif === t.id ? 'bg-[#B83232] text-white' : 'bg-white text-gray-600 hover:bg-red-50 border border-gray-200'}`}>
                {t.label}
              </Link>
            ))}
          </div>

          {/* Grille */}
          {!realisations || realisations.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl mb-2">Aucune réalisation dans cette catégorie.</p>
              <p className="text-sm">Revenez bientôt — nos projets seront publiés ici.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {realisations.map((real: any) => (
                <Link key={real.id} href={`/realisations/${real.slug}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {real.images[0] ? (
                        <img src={real.images[0]} alt={real.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50 text-5xl">🔆</div>
                      )}
                      <span className="absolute top-3 left-3 bg-[#B83232] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {typeLabels[real.type_projet] || real.type_projet}
                      </span>
                    </div>
                    <div className="p-5">
                      <h2 className="font-bold text-[#1E3A5F] text-lg mb-2 group-hover:text-[#B83232] transition-colors line-clamp-2">{real.titre}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><MapPin size={13} /> {real.lieu}</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {new Date(real.date_realisation).toLocaleDateString('fr-CM', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{real.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
