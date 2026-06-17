import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Realisation } from '@/types/database'

async function getRealisations(): Promise<Realisation[]> {
  const { data } = await supabase
    .from('realisations')
    .select('*')
    .eq('en_vedette', true)
    .eq('actif', true)
    .limit(3)
    .order('date_realisation', { ascending: false })

  return data || []
}

const typeLabels: Record<string, string> = {
  installation_solaire: 'Installation Solaire',
  pompage_solaire: 'Pompage Solaire',
  eclairage_solaire: 'Éclairage Solaire',
  systeme_hybride: 'Système Hybride',
}

export default async function RealisationsVedette() {
  const realisations = await getRealisations()

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Nos Réalisations</h2>
            <p className="text-blue-200">Découvrez nos projets réalisés à travers le Cameroun</p>
          </div>
          <Link href="/realisations" className="hidden sm:flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300">
            Voir tout <ArrowRight size={18} />
          </Link>
        </div>

        {realisations.length === 0 ? (
          <div className="text-center py-16 text-blue-300">
            <p>Les réalisations seront bientôt publiées.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {realisations.map((real) => (
              <Link key={real.id} href={`/realisations/${real.slug}`} className="group">
                <div className="rounded-2xl overflow-hidden bg-blue-800 hover:bg-blue-700 transition-colors">
                  <div className="aspect-video bg-blue-700 relative overflow-hidden">
                    {real.images[0] ? (
                      <img
                        src={real.images[0]}
                        alt={real.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">🔆</div>
                    )}
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {typeLabels[real.type_projet] || real.type_projet}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-lg mb-2">{real.titre}</h3>
                    <div className="flex items-center gap-1 text-blue-300 text-sm">
                      <MapPin size={14} />
                      {real.lieu}
                    </div>
                    <p className="text-blue-200 text-sm mt-2 line-clamp-2">{real.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
