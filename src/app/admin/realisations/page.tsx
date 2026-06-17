import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Pencil, MapPin } from 'lucide-react'
import { TYPES_PROJET } from '@/lib/constants'

export default async function AdminRealisationsPage() {
  const { data: realisations } = await supabaseAdmin()
    .from('realisations')
    .select('*')
    .order('date_realisation', { ascending: false })

  const getTypeLabel = (id: string) => TYPES_PROJET.find((t) => t.id === id)?.label || id

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Réalisations</h1>
          <p className="text-gray-500">{realisations?.length || 0} réalisation(s)</p>
        </div>
        <Link href="/admin/realisations/nouveau"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-colors">
          <Plus size={18} /> Ajouter une réalisation
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {realisations?.map((real) => (
          <div key={real.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 relative">
              {real.images[0] ? (
                <img src={real.images[0]} alt={real.titre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">🔆</div>
              )}
              <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full text-white ${real.en_vedette ? 'bg-amber-500' : 'bg-gray-500'}`}>
                {real.en_vedette ? '⭐ Vedette' : 'Standard'}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{real.titre}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                <MapPin size={13} /> {real.lieu}
              </div>
              <p className="text-xs text-blue-600 font-medium mb-3">{getTypeLabel(real.type_projet)}</p>
              <Link href={`/admin/realisations/${real.id}`}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                <Pencil size={13} /> Modifier
              </Link>
            </div>
          </div>
        ))}

        {(!realisations || realisations.length === 0) && (
          <div className="col-span-3 text-center py-16 text-gray-400 bg-white rounded-2xl">
            <p>Aucune réalisation. <Link href="/admin/realisations/nouveau" className="text-blue-500 font-semibold">Ajouter la première</Link></p>
          </div>
        )}
      </div>
    </div>
  )
}
