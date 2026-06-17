'use client'

import { useState } from 'react'
import { ShoppingCart, X, Send, CheckCircle } from 'lucide-react'
import type { Produit } from '@/types/database'

export default function CommandeModal({ produit }: { produit: Produit }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ nom: '', telephone: '', email: '', ville: '', notes: '' })

  const prix = produit.prix_promo || produit.prix
  const total = prix * qty

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/commandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          produits: [{ id: produit.id, nom: produit.nom, quantite: qty, prix_unitaire: prix }],
          total,
        }),
      })
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-[#B83232] hover:bg-red-800 text-white font-bold py-4 rounded-xl transition-colors text-lg"
      >
        <ShoppingCart size={22} /> Commander maintenant
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-[#1E3A5F] text-lg">Passer une commande</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            {success ? (
              <div className="flex flex-col items-center py-12 px-6 text-center">
                <CheckCircle size={60} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Commande reçue !</h3>
                <p className="text-gray-500 text-sm mb-6">Nous vous contactons dans les 2 heures pour confirmer et organiser la livraison.</p>
                <button onClick={() => { setOpen(false); setSuccess(false) }}
                  className="bg-[#B83232] text-white font-bold px-6 py-3 rounded-xl">
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Récap produit */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                  {produit.images[0] && (
                    <img src={produit.images[0]} alt={produit.nom} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{produit.nom}</p>
                    <p className="text-[#B83232] font-bold">{prix.toLocaleString('fr-CM')} FCFA / unité</p>
                  </div>
                </div>

                {/* Quantité */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-50">−</button>
                    <span className="text-lg font-bold w-8 text-center">{qty}</span>
                    <button type="button" onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-50">+</button>
                    <span className="ml-2 text-[#B83232] font-bold">= {total.toLocaleString('fr-CM')} FCFA</span>
                  </div>
                </div>

                {/* Infos client */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input type="text" required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83232]"
                    placeholder="Jean Dupont" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input type="tel" required value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83232]"
                      placeholder="+237 6XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                    <input type="text" required value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83232]"
                      placeholder="Yaoundé" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83232]"
                    placeholder="optionnel" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83232] resize-none"
                    placeholder="Précisions sur la livraison..." />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#B83232] hover:bg-red-800 disabled:bg-red-300 text-white font-bold py-4 rounded-xl transition-colors">
                  <Send size={18} />
                  {loading ? 'Envoi...' : `Confirmer la commande — ${total.toLocaleString('fr-CM')} FCFA`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
