'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, CheckCircle } from 'lucide-react'
import { TYPES_PROJET } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80) + '-' + Date.now()
}

export default function RealisationForm({ realisation }: { realisation?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    titre: realisation?.titre || '',
    description: realisation?.description || '',
    lieu: realisation?.lieu || '',
    type_projet: realisation?.type_projet || TYPES_PROJET[0].id,
    date_realisation: realisation?.date_realisation || new Date().toISOString().split('T')[0],
    en_vedette: realisation?.en_vedette || false,
    actif: realisation?.actif ?? true,
    images: realisation?.images || [] as string[],
  })

  const uploadImages = async (files: FileList) => {
    setUploadingImages(true)
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `realisations/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
      const { data, error } = await supabase.storage.from('media').upload(path, file)
      if (!error && data) {
        const { data: url } = supabase.storage.from('media').getPublicUrl(path)
        uploaded.push(url.publicUrl)
      }
    }
    setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }))
    setUploadingImages(false)
  }

  const removeImage = (url: string) => {
    setForm((f) => ({ ...f, images: f.images.filter((i: string) => i !== url) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        titre: form.titre,
        description: form.description,
        lieu: form.lieu,
        type_projet: form.type_projet,
        date_realisation: form.date_realisation,
        en_vedette: form.en_vedette,
        actif: form.actif,
        images: form.images,
        slug: realisation?.slug || slugify(form.titre),
      }

      if (realisation?.id) {
        await (supabase as any).from('realisations').update(payload).eq('id', realisation.id)
      } else {
        await (supabase as any).from('realisations').insert(payload)
      }
      setSuccess(true)
      setTimeout(() => router.push('/admin/realisations'), 1500)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <CheckCircle size={60} className="text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Réalisation enregistrée !</h3>
        <p className="text-gray-500 text-sm mt-1">Redirection en cours...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Informations du projet</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre du projet *</label>
          <input type="text" required value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B83232] text-sm"
            placeholder="Ex: Installation solaire 5kW — Résidence à Yaoundé" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B83232] text-sm resize-none"
            placeholder="Décrivez le projet : contexte, travaux réalisés, résultats obtenus..." />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de projet *</label>
            <select required value={form.type_projet} onChange={(e) => setForm({ ...form, type_projet: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B83232] text-sm bg-white">
              {TYPES_PROJET.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu *</label>
            <input type="text" required value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B83232] text-sm"
              placeholder="Yaoundé, Cameroun" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de réalisation *</label>
          <input type="date" required value={form.date_realisation} onChange={(e) => setForm({ ...form, date_realisation: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B83232] text-sm" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.en_vedette} onChange={(e) => setForm({ ...form, en_vedette: e.target.checked })}
              className="w-4 h-4 rounded accent-[#B83232]" />
            <span className="text-sm font-medium text-gray-700">Mettre en vedette (page d&apos;accueil)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.actif} onChange={(e) => setForm({ ...form, actif: e.target.checked })}
              className="w-4 h-4 rounded accent-green-500" />
            <span className="text-sm font-medium text-gray-700">Visible sur le site</span>
          </label>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3 mb-4">Photos du projet</h2>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#B83232] rounded-xl p-8 cursor-pointer transition-colors mb-4">
          <Upload size={32} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 font-medium">Cliquez pour uploader des photos</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — Avant/après recommandé</p>
          <input type="file" multiple accept="image/*" className="hidden"
            onChange={(e) => e.target.files && uploadImages(e.target.files)} />
        </label>
        {uploadingImages && <p className="text-sm text-[#B83232] font-medium mb-3">⏳ Upload en cours...</p>}
        {form.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {form.images.map((url: string, i: number) => (
              <div key={url} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 group">
                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={loading}
          className="flex-1 bg-[#B83232] hover:bg-red-800 disabled:bg-red-300 text-white font-bold py-4 rounded-xl transition-colors">
          {loading ? 'Enregistrement...' : realisation ? 'Mettre à jour' : 'Publier la réalisation'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  )
}
