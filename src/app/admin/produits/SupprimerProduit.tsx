'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function SupprimerProduit({ id, nom }: { id: string; nom: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    await fetch('/api/admin/produits', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-600 font-medium">Confirmer ?</span>
        <button onClick={handleDelete} disabled={loading}
          className="text-xs bg-red-600 text-white px-2 py-1 rounded font-medium hover:bg-red-700 disabled:opacity-50">
          {loading ? '...' : 'Oui'}
        </button>
        <button onClick={() => setConfirm(false)} className="text-xs text-gray-500 hover:text-gray-700">
          Non
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => setConfirm(true)}
      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium ml-3">
      <Trash2 size={14} /> Supprimer
    </button>
  )
}
