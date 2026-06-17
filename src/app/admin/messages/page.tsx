import { supabaseAdmin } from '@/lib/supabase'
import { Phone, Mail, Clock } from 'lucide-react'

export default async function AdminMessagesPage() {
  const { data: messages } = await (supabaseAdmin() as any)
    .from('messages_contact')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages & Demandes de devis</h1>
      <p className="text-gray-500 mb-6">{messages?.filter((m: any) => !m.lu).length || 0} message(s) non lu(s)</p>

      <div className="space-y-4">
        {messages?.map((msg: any) => (
          <div key={msg.id} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${msg.lu ? 'border-gray-200' : 'border-amber-500'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{msg.nom}</h3>
                <p className="text-sm text-amber-700 font-medium">{msg.sujet}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <Clock size={12} />
                {new Date(msg.created_at).toLocaleDateString('fr-CM', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{msg.message}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${msg.telephone}`} className="flex items-center gap-1 text-green-700 font-semibold text-sm hover:text-green-900">
                <Phone size={14} /> {msg.telephone}
              </a>
              <a href={`mailto:${msg.email}`} className="flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900">
                <Mail size={14} /> {msg.email}
              </a>
            </div>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">
            Aucun message pour le moment.
          </div>
        )}
      </div>
    </div>
  )
}
