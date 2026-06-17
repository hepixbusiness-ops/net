import ProduitForm from '@/components/ui/ProduitForm'

export default function NouveauProduitPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un produit</h1>
      <ProduitForm />
    </div>
  )
}
