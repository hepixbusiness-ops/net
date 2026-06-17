/**
 * Script de génération automatique d'articles de blog
 * Appelé par GitHub Actions chaque matin à 08h00 (heure Cameroun)
 */

import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const THEMES = [
  "Les avantages de l'énergie solaire pour les ménages camerounais",
  "Comment fonctionne un système de pompage solaire ?",
  "Lampadaires solaires : éclairage durable pour les villes africaines",
  "Combien coûte une installation solaire au Cameroun en 2025 ?",
  "Entretien et maintenance de vos panneaux solaires",
  "L'énergie solaire comme solution aux coupures d'électricité au Cameroun",
  "Kit solaire pour foyer : comment bien choisir ?",
  "Pompage solaire agricole : révolution pour les agriculteurs camerounais",
  "Comparatif : énergie solaire vs générateur diesel",
  "Les aides et financements disponibles pour le solaire en Afrique centrale",
  "Comment calculer la puissance solaire dont vous avez besoin ?",
  "L'onduleur solaire : rôle et importance dans votre installation",
  "Énergie solaire et eau potable : le combo gagnant en zone rurale",
  "ROI d'une installation solaire : quand rentabilisez-vous l'investissement ?",
  "Les meilleures batteries solaires pour une autonomie maximale",
]

function getThemeOfTheDay() {
  if (process.env.CUSTOM_THEME) return process.env.CUSTOM_THEME
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return THEMES[dayOfYear % THEMES.length]
}

function slugify(text) {
  const date = new Date().toISOString().split('T')[0]
  return date + '-' + text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80)
}

async function generateArticle(theme) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `Tu es un expert en énergie solaire et rédacteur web pour New Energy Technology SARL,
une entreprise camerounaise spécialisée dans les installations solaires, le pompage solaire
et la vente d'équipements solaires.
Rédige des articles en français, adaptés au marché camerounais et africain,
optimisés pour le SEO, pratiques et accessibles.`,
      },
      {
        role: 'user',
        content: `Rédige un article de blog complet sur le thème : "${theme}"

Format de réponse JSON strict :
{
  "titre": "Titre accrocheur SEO (60 caractères max)",
  "extrait": "Résumé de 160 caractères max pour meta description",
  "contenu": "Article complet en Markdown (600-800 mots), avec introduction, 3-4 sections avec titres ##, conseils pratiques, conclusion avec appel à l'action vers New Energy Technology SARL",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  return JSON.parse(completion.choices[0].message.content)
}

async function main() {
  const theme = getThemeOfTheDay()
  console.log(`📝 Génération article : "${theme}"`)

  const article = await generateArticle(theme)
  console.log(`✅ Article généré : "${article.titre}"`)

  const { error } = await supabase.from('articles').insert({
    titre: article.titre,
    contenu: article.contenu,
    extrait: article.extrait,
    slug: slugify(article.titre),
    tags: article.tags || [],
    publie: true,
    genere_par_ia: true,
  })

  if (error) {
    console.error('❌ Erreur insertion Supabase:', error.message)
    process.exit(1)
  }

  console.log('🚀 Article publié avec succès sur le site !')
}

main().catch((err) => {
  console.error('❌ Erreur:', err.message)
  process.exit(1)
})
