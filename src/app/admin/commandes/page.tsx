export const dynamic = 'force-dynamic'
export const revalidate = 0

import { supabaseAdmin } from '@/lib/supabase'
import { Phone, Mail, MapPin, Package } from 'lucide-react'

const STATUTS: Record<string, { label: string; color: string }> = {
  en_attente:  { label: 'En attente',  color: 'bg-yellow-100 text-yellow-800' },
  confirmee:   { label: 'Confirmée',   color: 'bg-blue-100 text-blue-800' },
  en_cours:    { label: 'En cours',    color: 'bg-purple-100 text-purple-800' },
  livree:      { label: 'Livrée',      color: 'bg-green-100 text-green-800' },
  annulee:     { label: 'Annulée',     color: 'bg-red-100 text-red-800' },
}

export default async function AdminCommandesPage() {
  const { data: commandes } = await (supabaseAdmin() as any)
    .from('commandes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
        <p className="text-gray-500">{commandes?.length || 0} commande(s) au total</p>
      </div>

      <div className="space-y-4">
        {commandes?.map((cmd: any) => {
          const statut = STATUTS[cmd.statut] || { label: cmd.statut, color: 'bg-gray-100 text-gray-700' }
          const produits = cmd.produits as any[]
          return (
            <div key={cmd.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{cmd.nom_client}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(cmd.created_at).toLocaleDateString('fr-CM', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statut.color}`}>{statut.label}</span>
                  <span className="text-lg font-bold text-[#B83232]">{cmd.total.toLocaleString('fr-CM')} FCFA</span>
                </div>
              </div>

              {/* Produits commandés */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Produits</p>
                {produits?.map((p: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{p.nom} × {p.quantite}</span>
                    <span className="font-semibold">{(p.prix_unitaire * p.quantite).toLocaleString('fr-CM')} FCFA</span>
                  </div>
                ))}
              </div>

              {/* Contacts */}
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${cmd.telephone_client}`} className="flex items-center gap-1 text-green-700 font-semibold text-sm hover:text-green-900">
                  <Phone size={14} /> {cmd.telephone_client}
                </a>
                {cmd.email_client && (
                  <a href={`mailto:${cmd.email_client}`} className="flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900">
                    <Mail size={14} /> {cmd.email_client}
                  </a>
                )}
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  <MapPin size={14} /> {cmd.ville}
                </span>
              </div>

              {cmd.notes && (
                <p className="mt-3 text-sm text-gray-500 bg-yellow-50 border border-yellow-100 rounded-lg px-4 py-2">
                  📝 {cmd.notes}
                </p>
              )}
            </div>
          )
        })}

        {(!commandes || commandes.length === 0) && (
          <div className="text-center py-20 text-gray-400 bg-white rounded-2xl">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p>Aucune commande pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
