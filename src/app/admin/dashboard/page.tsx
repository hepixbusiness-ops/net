import { supabaseAdmin } from '@/lib/supabase'
import { Package, Camera, FileText, ShoppingBag, MessageSquare, TrendingUp } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const db = supabaseAdmin()
  const [produits, realisations, articles, commandes, messages] = await Promise.all([
    db.from('produits').select('id', { count: 'exact' }),
    db.from('realisations').select('id', { count: 'exact' }),
    db.from('articles').select('id', { count: 'exact' }),
    db.from('commandes').select('id', { count: 'exact' }).eq('statut', 'en_attente'),
    db.from('messages_contact').select('id', { count: 'exact' }).eq('lu', false),
  ])
  return {
    produits: produits.count || 0,
    realisations: realisations.count || 0,
    articles: articles.count || 0,
    commandesEnAttente: commandes.count || 0,
    messagesNonLus: messages.count || 0,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Produits', value: stats.produits, icon: Package, href: '/admin/produits', color: 'bg-amber-500' },
    { label: 'Réalisations', value: stats.realisations, icon: Camera, href: '/admin/realisations', color: 'bg-blue-500' },
    { label: 'Articles Blog', value: stats.articles, icon: FileText, href: '/admin/blog', color: 'bg-green-500' },
    { label: 'Commandes en attente', value: stats.commandesEnAttente, icon: ShoppingBag, href: '/admin/commandes', color: 'bg-orange-500' },
    { label: 'Messages non lus', value: stats.messagesNonLus, icon: MessageSquare, href: '/admin/messages', color: 'bg-purple-500' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
      <p className="text-gray-500 mb-8">Bienvenue dans l&apos;espace d&apos;administration de New Energy Technology SARL</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={22} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </Link>
        ))}
      </div>

      {/* Raccourcis actions rapides */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/produits/nouveau', label: '+ Ajouter un produit', color: 'bg-amber-500 hover:bg-amber-600' },
          { href: '/admin/realisations/nouveau', label: '+ Ajouter une réalisation', color: 'bg-blue-600 hover:bg-blue-700' },
          { href: '/admin/blog', label: '+ Voir le blog', color: 'bg-green-600 hover:bg-green-700' },
        ].map(({ href, label, color }) => (
          <Link key={href} href={href} className={`${color} text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors`}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
