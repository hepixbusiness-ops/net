'use client'

import { MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function CommanderWhatsApp({ produit }: { produit: any }) {
  const prix = produit.prix_promo || produit.prix

  const handleClick = () => {
    const msg = encodeURIComponent(
      `Bonjour NEW ENERGY TECHNOLOGY SARL ! 👋\n\nJe souhaite commander :\n\n` +
      `📦 *${produit.nom}*\n` +
      `💰 Prix : ${prix.toLocaleString('fr-CM')} FCFA\n\n` +
      `Pouvez-vous me donner plus d'informations sur la disponibilité et la livraison ? Merci !`
    )
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors text-lg"
    >
      <MessageCircle size={22} /> Commander via WhatsApp
    </button>
  )
}
