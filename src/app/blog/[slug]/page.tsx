import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Clock, Tag, Bot } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await (supabase as any).from('articles').select('titre, extrait').eq('slug', slug).single()
  if (!data) return { title: 'Article introuvable' }
  return { title: data.titre, description: data.extrait }
}

function renderMarkdown(content: string) {
  return content
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-[#1E3A5F] mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 mb-1"><span class="text-[#B83232] mt-1">•</span><span>$1</span></li>')
    .replace(/(<li.*<\/li>(\n|$))+/g, '<ul class="mb-4 space-y-1">$&</ul>')
    .replace(/^(?!<[h|u|l]).+$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$&</p>')
    .replace(/<p class="text-gray-700 leading-relaxed mb-4"><\/p>/g, '')
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: article } = await (supabase as any).from('articles').select('*').eq('slug', slug).eq('publie', true).single()

  if (!article) notFound()

  const { data: autresArticles } = await (supabase as any)
    .from('articles').select('id, titre, slug, extrait, created_at').eq('publie', true)
    .neq('slug', slug).limit(3).order('created_at', { ascending: false })

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Header article */}
        <div className="bg-[#1E3A5F] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag: string) => (
                <span key={tag} className="bg-[#B83232]/80 text-white text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{article.titre}</h1>
            <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(article.created_at).toLocaleDateString('fr-CM', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              {article.genere_par_ia && (
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                  <Bot size={13} /> Article généré par IA
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#B83232] text-sm mb-6 transition-colors">
                <ArrowLeft size={16} /> Retour au blog
              </Link>

              {article.image_couverture && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <img src={article.image_couverture} alt={article.titre} className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className="bg-white rounded-2xl p-8 shadow-sm prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(article.contenu) }}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Résumé */}
              <div className="bg-[#B83232]/5 border border-[#B83232]/20 rounded-2xl p-5">
                <h3 className="font-bold text-[#1E3A5F] mb-2">En résumé</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{article.extrait}</p>
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#1E3A5F] mb-3 flex items-center gap-2"><Tag size={16} /> Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Autres articles */}
              {autresArticles && autresArticles.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#1E3A5F] mb-4">Autres articles</h3>
                  <div className="space-y-4">
                    {autresArticles.map((a: any) => (
                      <Link key={a.id} href={`/blog/${a.slug}`} className="block group">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#B83232] transition-colors line-clamp-2 mb-1">{a.titre}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(a.created_at).toLocaleDateString('fr-CM', { day: 'numeric', month: 'short' })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-[#1E3A5F] text-white rounded-2xl p-5">
                <h3 className="font-bold mb-2">Un projet solaire ?</h3>
                <p className="text-blue-200 text-sm mb-4">Devis gratuit sous 24h par nos experts.</p>
                <Link href="/contact"
                  className="block text-center bg-[#B83232] hover:bg-red-800 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
