import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Pencil, Eye, EyeOff } from 'lucide-react'
import { CATEGORIES_PRODUITS } from '@/lib/constants'
import SupprimerProduit from './SupprimerProduit'

export default async function AdminProduitsPage() {
  const { data: produits } = await (supabaseAdmin() as any)
    .from('produits')
    .select('*')
    .order('created_at', { ascending: false })

  const getCatLabel = (id: string) => CATEGORIES_PRODUITS.find((c) => c.id === id)?.label || id

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-gray-500">{produits?.length || 0} produit(s) au total</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-3 rounded-xl transition-colors"
        >
          <Plus size={18} /> Ajouter un produit
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Produit</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Catégorie</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Prix</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {produits?.map((p: any) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">☀️</div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 line-clamp-1">{p.nom}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{getCatLabel(p.categorie)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-amber-600">
                  {(p.prix_promo || p.prix).toLocaleString('fr-CM')} FCFA
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.stock}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${p.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.actif ? <><Eye size={12} /> Actif</> : <><EyeOff size={12} /> Inactif</>}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Link href={`/admin/produits/${p.id}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      <Pencil size={14} /> Modifier
                    </Link>
                    <SupprimerProduit id={p.id} nom={p.nom} />
                  </div>
                </td>
              </tr>
            ))}
            {(!produits || produits.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                  Aucun produit. <Link href="/admin/produits/nouveau" className="text-amber-500 font-semibold">Ajouter le premier</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
