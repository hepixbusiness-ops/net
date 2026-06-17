import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, email, telephone, sujet, message } = body

    if (!nom || !email || !telephone || !sujet || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const { error } = await supabaseAdmin().from('messages_contact').insert({
      nom: nom.trim(),
      email: email.trim().toLowerCase(),
      telephone: telephone.trim(),
      sujet: sujet.trim(),
      message: message.trim(),
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
