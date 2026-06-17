import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/types/database'

async function getArticles(): Promise<Article[]> {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('publie', true)
    .limit(3)
    .order('created_at', { ascending: false })

  return data || []
}

export default async function BlogPreview() {
  const articles = await getArticles()

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
              Actualités & Conseils
            </h2>
            <p className="text-gray-600">Restez informé sur l&apos;énergie solaire au Cameroun</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700">
            Voir tout <ArrowRight size={18} />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>Les articles seront publiés prochainement.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-blue-100 relative">
                    {article.image_couverture ? (
                      <img
                        src={article.image_couverture}
                        alt={article.titre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">☀️</div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <Clock size={12} />
                      {new Date(article.created_at).toLocaleDateString('fr-CM', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                      {article.genere_par_ia && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">IA</span>
                      )}
                    </div>
                    <h3 className="font-bold text-blue-900 text-lg mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {article.titre}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{article.extrait}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
