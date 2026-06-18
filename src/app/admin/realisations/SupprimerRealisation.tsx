'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function SupprimerRealisation({ id, titre }: { id: string; titre: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return }
    await fetch('/api/admin/realisations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} onBlur={() => setConfirming(false)}
      className={`flex items-center gap-1 text-sm font-medium transition-colors ${confirming ? 'text-red-600 hover:text-red-800' : 'text-gray-400 hover:text-red-500'}`}>
      <Trash2 size={14} />
      {confirming ? `Supprimer "${titre}" ?` : 'Supprimer'}
    </button>
  )
}
