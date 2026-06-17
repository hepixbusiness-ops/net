import { notFound } from 'next/navigation'
import RealisationForm from '@/components/ui/RealisationForm'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditRealisationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: realisation } = await supabaseAdmin().from('realisations').select('*').eq('id', id).single()

  if (!realisation) notFound()

  return (
    <div className="p-8">
      <Link href="/admin/realisations" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#B83232] text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Retour aux réalisations
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Modifier la réalisation</h1>
      <RealisationForm realisation={realisation} />
    </div>
  )
}
