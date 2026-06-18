'use client'

import { useRouter } from 'next/navigation'

export default function MarquerLuButton({ id, lu, emailHref }: { id: string; lu: boolean; emailHref: string }) {
  const router = useRouter()

  async function handleReply() {
    if (!lu) {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      router.refresh()
    }
    window.location.href = emailHref
  }

  return (
    <button onClick={handleReply} className="text-sm font-medium text-blue-600 hover:text-blue-800">
      Répondre par email →
    </button>
  )
}
