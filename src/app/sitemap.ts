import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { SITE } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url

  const [{ data: produits }, { data: realisations }, { data: articles }] = await Promise.all([
    (supabase as any).from('produits').select('slug, updated_at').eq('actif', true),
    (supabase as any).from('realisations').select('slug, created_at').eq('actif', true),
    (supabase as any).from('articles').select('slug, updated_at').eq('publie', true),
  ])

  const staticPages = [
    { url: base, priority: 1 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/boutique`, priority: 0.9 },
    { url: `${base}/realisations`, priority: 0.8 },
    { url: `${base}/blog`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.7 },
  ].map(p => ({ ...p, lastModified: new Date(), changeFrequency: 'weekly' as const }))

  const produitPages = ((produits || []) as any[]).map((p: any) => ({
    url: `${base}/boutique/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const realisationPages = ((realisations || []) as any[]).map((r: any) => ({
    url: `${base}/realisations/${r.slug}`,
    lastModified: new Date(r.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const articlePages = ((articles || []) as any[]).map((a: any) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...produitPages, ...realisationPages, ...articlePages]
}
