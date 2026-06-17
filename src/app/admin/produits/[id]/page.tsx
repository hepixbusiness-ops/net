import { notFound } from 'next/navigation'
import ProduitForm from '@/components/ui/ProduitForm'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditProduitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: produit } = await supabaseAdmin().from('produits').select('*').eq('id', id).single()

  if (!produit) notFound()

  return (
    <div className="p-8">
      <Link href="/admin/produits" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#B83232] text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Retour aux produits
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Modifier le produit</h1>
      <ProduitForm produit={produit} />
    </div>
  )
}
