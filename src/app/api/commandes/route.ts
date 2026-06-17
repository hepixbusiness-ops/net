import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, telephone, email, ville, produits, total, notes } = body

    if (!nom || !telephone || !ville || !produits || !total) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const { error } = await (supabaseAdmin() as any).from('commandes').insert({
      nom_client: nom.trim(),
      email_client: email?.trim().toLowerCase() || '',
      telephone_client: telephone.trim(),
      ville: ville.trim(),
      produits,
      total: Number(total),
      notes: notes?.trim() || null,
      statut: 'en_attente',
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Commande error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
