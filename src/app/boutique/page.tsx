export const dynamic = 'force-dynamic'
export const revalidate = 0

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { CATEGORIES_PRODUITS, SOUS_CATEGORIES_ACCESSOIRES } from '@/lib/constants'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boutique — Équipements Solaires',
  description: 'Achetez vos équipements solaires : lampadaires, panneaux solaires, batteries, pompes solaires au Cameroun.',
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; sous_categorie?: string }>
}) {
  const params = await searchParams
  const categorieActive = params.categorie
  const sousCategorieActive = params.sous_categorie

  let query = (supabase as any).from('produits').select('*').eq('actif', true).order('created_at', { ascending: false })
  if (categorieActive) query = query.eq('categorie', categorieActive)
  if (sousCategorieActive) query = query.eq('sous_categorie', sousCategorieActive)

  const { data: produits } = await query

  const isAccessoires = categorieActive === 'accessoires'

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-[#1E3A5F] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Notre Boutique</h1>
            <p className="text-blue-200">Équipements solaires professionnels livrés au Cameroun</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filtres catégories */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Link href="/boutique"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!categorieActive ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 hover:bg-amber-50 border border-gray-200'}`}>
              Tous les produits
            </Link>
            {CATEGORIES_PRODUITS.map((cat) => (
              <Link key={cat.id} href={`/boutique?categorie=${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${categorieActive === cat.id ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 hover:bg-amber-50 border border-gray-200'}`}>
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Sous-catégories accessoires */}
          {isAccessoires && (
            <div className="flex flex-wrap gap-2 mb-6 pl-3 border-l-4 border-amber-400">
              <Link href="/boutique?categorie=accessoires"
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!sousCategorieActive ? 'bg-[#1E3A5F] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                Tous les accessoires
              </Link>
              {SOUS_CATEGORIES_ACCESSOIRES.map((sc) => (
                <Link key={sc.id} href={`/boutique?categorie=accessoires&sous_categorie=${sc.id}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${sousCategorieActive === sc.id ? 'bg-[#1E3A5F] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                  {sc.label}
                </Link>
              ))}
            </div>
          )}

          {/* Grille produits */}
          {!produits || produits.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl mb-2">Aucun produit dans cette catégorie.</p>
              <p className="text-sm">Revenez bientôt, notre catalogue s&apos;enrichit chaque jour.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produits.map((produit: any) => (
                <div key={produit.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/boutique/${produit.slug}`}>
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {produit.images[0] ? (
                        <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">☀️</div>
                      )}
                      {produit.prix_promo && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">PROMO</span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/boutique/${produit.slug}`}>
                      <h2 className="font-semibold text-[#1E3A5F] mb-2 line-clamp-2 hover:text-amber-600 transition-colors">{produit.nom}</h2>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-amber-600 font-bold text-lg">
                        {(produit.prix_promo || produit.prix).toLocaleString('fr-CM')} FCFA
                      </span>
                      {produit.prix_promo && (
                        <span className="text-gray-500 text-sm line-through">{produit.prix.toLocaleString('fr-CM')}</span>
                      )}
                    </div>
                    <Link href={`/boutique/${produit.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#1E3A5F] hover:bg-[#B83232] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                      <ShoppingCart size={16} /> Voir & Commander
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
