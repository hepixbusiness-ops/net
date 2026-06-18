'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function MarquerLuButton({ id, lu, emailHref }: { id: string; lu: boolean; emailHref: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  async function handleReply() {
    if (!lu) {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
    }
    window.location.href = emailHref
  }

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return }
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return (
    <>
      <button onClick={handleReply} className="text-sm font-medium text-blue-600 hover:text-blue-800">
        Répondre par email →
      </button>
      <button onClick={handleDelete}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${confirming ? 'text-red-600 hover:text-red-800' : 'text-gray-400 hover:text-red-500'}`}
        onBlur={() => setConfirming(false)}>
        <Trash2 size={14} />
        {confirming ? 'Confirmer la suppression' : 'Supprimer'}
      </button>
    </>
  )
}
