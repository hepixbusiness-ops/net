'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const sujets = [
  'Demande de devis — Installation solaire',
  'Demande de devis — Pompage solaire',
  'Demande de devis — Éclairage solaire',
  'Question sur un produit',
  'Commande en gros',
  'Partenariat',
  'Autre',
]

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: sujets[0], message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } })
      if (res.ok) setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={60} className="text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Message envoyé !</h3>
        <p className="text-gray-600">Nous vous répondrons dans les 24 heures. Merci de votre confiance.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Envoyez-nous un message</h2>
      <p className="text-gray-500 text-sm mb-6">Tous les champs marqués * sont obligatoires.</p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
          <input
            type="text" required
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
          <input
            type="tel" required
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            placeholder="+237 6XX XXX XXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email" required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          placeholder="jean@exemple.cm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
        <select
          required
          value={form.sujet}
          onChange={(e) => setForm({ ...form, sujet: e.target.value })}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white"
        >
          {sujets.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          required rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
          placeholder="Décrivez votre projet ou votre demande..."
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-4 rounded-xl transition-colors text-lg"
      >
        <Send size={20} />
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
}
