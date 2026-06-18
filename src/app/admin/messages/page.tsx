import { supabaseAdmin } from '@/lib/supabase'
import { Clock, Mail, Phone, User, MessageSquare } from 'lucide-react'
import MarquerLuButton from './MarquerLuButton'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  const { data: messages } = await (supabaseAdmin() as any)
    .from('messages_contact')
    .select('*')
    .order('created_at', { ascending: false })

  const nonLus = messages?.filter((m: any) => !m.lu).length || 0

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500">
          {messages?.length || 0} message(s) —{' '}
          {nonLus > 0 && <span className="text-red-600 font-semibold">{nonLus} non lu(s)</span>}
          {nonLus === 0 && <span className="text-green-600">tous lus</span>}
        </p>
      </div>

      <div className="space-y-4">
        {messages?.map((msg: any) => (
          <div key={msg.id} className={`bg-white rounded-2xl shadow-sm p-6 border-2 transition-colors ${msg.lu ? 'border-gray-100' : 'border-red-200 bg-red-50/30'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {!msg.lu && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                  <h2 className="font-semibold text-gray-900 text-lg">{msg.sujet}</h2>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><User size={14} /> {msg.nom}</span>
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-amber-600">
                    <Mail size={14} /> {msg.email}
                  </a>
                  {msg.telephone && (
                    <a href={`tel:${msg.telephone}`} className="flex items-center gap-1 hover:text-amber-600">
                      <Phone size={14} /> {msg.telephone}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                <Clock size={13} />
                {new Date(msg.created_at).toLocaleDateString('fr-CM', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex gap-3">
              <MessageSquare size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <MarquerLuButton id={msg.id} lu={msg.lu}
                emailHref={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.sujet)}`} />
              {msg.telephone && (
                <a href={`https://wa.me/${msg.telephone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-green-600 hover:text-green-800">
                  WhatsApp →
                </a>
              )}
            </div>
          </div>
        ))}

        {(!messages || messages.length === 0) && (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center text-gray-400">
            Aucun message reçu pour le moment.
          </div>
        )}
      </div>
    </div>
  )
}
