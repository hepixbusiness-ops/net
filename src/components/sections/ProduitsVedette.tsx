import Link from 'next/link'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produit } from '@/types/database'

async function getProduitsVedette(): Promise<Produit[]> {
  const { data } = await supabase
    .from('produits')
    .select('*')
    .eq('en_vedette', true)
    .eq('actif', true)
    .limit(4)
    .order('created_at', { ascending: false })

  return data || []
}

export default async function ProduitsVedette() {
  const produits = await getProduitsVedette()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
              Nos Produits
            </h2>
            <p className="text-gray-600">Équipements solaires de qualité professionnelle</p>
          </div>
          <Link href="/boutique" className="hidden sm:flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700">
            Voir tout <ArrowRight size={18} />
          </Link>
        </div>

        {produits.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>Les produits seront bientôt disponibles.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produits.map((produit) => (
              <Link key={produit.id} href={`/boutique/${produit.slug}`} className="group">
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    {produit.images[0] ? (
                      <img
                        src={produit.images[0]}
                        alt={produit.nom}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">☀️</div>
                    )}
                    {produit.prix_promo && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        PROMO
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-1 line-clamp-2">{produit.nom}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">
                        {(produit.prix_promo || produit.prix).toLocaleString('fr-CM')} FCFA
                      </span>
                      {produit.prix_promo && (
                        <span className="text-gray-400 text-sm line-through">
                          {produit.prix.toLocaleString('fr-CM')}
                        </span>
                      )}
                    </div>
                    <button className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                      <ShoppingCart size={16} /> Commander
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/boutique" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
            Voir tous les produits <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
