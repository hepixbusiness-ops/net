import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CommandeModal from '@/components/ui/CommandeModal'
import { ArrowLeft, CheckCircle, Package } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { CATEGORIES_PRODUITS } from '@/lib/constants'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await (supabase as any).from('produits').select('nom, description').eq('slug', slug).single()
  if (!data) return { title: 'Produit introuvable' }
  return { title: data.nom, description: data.description.substring(0, 160) }
}

export default async function ProduitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: produit } = await (supabase as any).from('produits').select('*').eq('slug', slug).eq('actif', true).single()

  if (!produit) notFound()

  const catLabel = CATEGORIES_PRODUITS.find(c => c.id === produit.categorie)?.label || produit.categorie
  const [imageActive, setImageActive] = [produit.images[0], null]

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/boutique" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#B83232] text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour à la boutique
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galerie images */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
                {produit.images[0] ? (
                  <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl bg-gray-50">☀️</div>
                )}
              </div>
              {produit.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {produit.images.map((img: any, i: number) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer">
                      <img src={img} alt={`${produit.nom} ${i + 1}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Détails produit */}
            <div>
              <span className="inline-block bg-red-50 text-[#B83232] text-xs font-bold px-3 py-1 rounded-full mb-3">{catLabel}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-4">{produit.nom}</h1>

              {/* Prix */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#B83232]">
                  {(produit.prix_promo || produit.prix).toLocaleString('fr-CM')} FCFA
                </span>
                {produit.prix_promo && (
                  <span className="text-lg text-gray-400 line-through">{produit.prix.toLocaleString('fr-CM')} FCFA</span>
                )}
                {produit.prix_promo && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{Math.round((1 - produit.prix_promo / produit.prix) * 100)}%
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {produit.stock > 0 ? (
                  <>
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-green-700 font-semibold text-sm">En stock ({produit.stock} disponibles)</span>
                  </>
                ) : (
                  <>
                    <Package size={18} className="text-orange-500" />
                    <span className="text-orange-600 font-semibold text-sm">Sur commande — délai 7-14 jours</span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <h2 className="font-bold text-[#1E3A5F] mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{produit.description}</p>
              </div>

              {/* Bouton commander */}
              <CommandeModal produit={produit} />

              <p className="text-xs text-gray-400 mt-3 text-center">
                Livraison disponible à Yaoundé, Douala et dans toutes les grandes villes du Cameroun
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
