import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Eye, EyeOff, Bot, Clock } from 'lucide-react'
import type { Article } from '@/types/database'

export default async function AdminBlogPage() {
  const { data: articles } = await (supabaseAdmin() as any)
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500">{articles?.length || 0} article(s) — publié automatiquement chaque matin</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
          <Bot size={16} /> Agent IA actif — 08h00
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Titre</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Source</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {articles?.map((article: any) => (
              <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 line-clamp-1">{article.titre}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{article.extrait}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={13} />
                    {new Date(article.created_at).toLocaleDateString('fr-CM', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {article.genere_par_ia ? (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <Bot size={12} /> IA
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      Manuel
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${article.publie ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {article.publie ? <><Eye size={12} /> Publié</> : <><EyeOff size={12} /> Brouillon</>}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/blog/${article.slug}`} target="_blank"
                    className="text-amber-600 hover:text-amber-800 text-sm font-medium">
                    Voir →
                  </Link>
                </td>
              </tr>
            ))}
            {(!articles || articles.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                  Aucun article. Le premier sera publié demain matin à 08h00 automatiquement.
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
