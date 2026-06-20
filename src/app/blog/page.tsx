import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog — Actualités Énergie Solaire Cameroun',
  description: 'Conseils, actualités et guides sur l\'énergie solaire au Cameroun par New Energy Technology SARL.',
}

export default async function BlogPage() {
  const { data: articles } = await (supabase as any)
    .from('articles')
    .select('*')
    .eq('publie', true)
    .order('created_at', { ascending: false })

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="bg-blue-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Blog & Actualités</h1>
            <p className="text-blue-200">Conseils, guides et actualités sur l&apos;énergie solaire au Cameroun</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!articles || articles.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Les articles seront publiés prochainement.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="aspect-video bg-gradient-to-br from-amber-100 to-blue-100">
                      {article.image_couverture ? (
                        <img src={article.image_couverture} alt={article.titre} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">☀️</div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">{tag}</span>
                        ))}
                      </div>
                      <h2 className="font-bold text-blue-900 text-lg mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {article.titre}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.extrait}</p>
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <Clock size={12} />
                        {new Date(article.created_at).toLocaleDateString('fr-CM', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
