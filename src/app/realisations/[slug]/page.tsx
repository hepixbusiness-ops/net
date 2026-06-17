import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { TYPES_PROJET } from '@/lib/constants'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await (supabase as any).from('realisations').select('titre, description').eq('slug', slug).single()
  if (!data) return { title: 'Réalisation introuvable' }
  return { title: data.titre, description: data.description.substring(0, 160) }
}

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: real } = await (supabase as any).from('realisations').select('*').eq('slug', slug).eq('actif', true).single()

  if (!real) notFound()

  const typeLabel = TYPES_PROJET.find(t => t.id === real.type_projet)?.label || real.type_projet

  return (
    <>
      <Navbar />
      <main>
        {/* Header avec image principale */}
        <div className="relative h-[50vh] min-h-[400px] bg-[#1E3A5F]">
          {real.images[0] && (
            <>
              <img src={real.images[0]} alt={real.titre} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <span className="inline-block bg-[#B83232] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{typeLabel}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{real.titre}</h1>
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14} /> {real.lieu}</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(real.date_realisation).toLocaleDateString('fr-CM', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#B83232] text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour aux réalisations
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">Description du projet</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{real.description}</p>

              {/* Galerie photos */}
              {real.images.length > 1 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">Photos du projet</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {real.images.map((img: string, i: number) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden">
                        <img src={img} alt={`${real.titre} — photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fiche projet */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-[#1E3A5F] text-lg mb-5 pb-3 border-b border-gray-200">Fiche du projet</h3>
                <dl className="space-y-4 text-sm">
                  {[
                    { label: 'Type', value: typeLabel },
                    { label: 'Lieu', value: real.lieu },
                    { label: 'Date', value: new Date(real.date_realisation).toLocaleDateString('fr-CM', { month: 'long', year: 'numeric' }) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-gray-500 font-medium mb-0.5">{label}</dt>
                      <dd className="text-gray-900 font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Un projet similaire ? Contactez-nous !</p>
                  <Link href="/contact"
                    className="flex items-center justify-center gap-2 bg-[#B83232] hover:bg-red-800 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                    Demander un devis <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
