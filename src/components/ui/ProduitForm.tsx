'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, CheckCircle } from 'lucide-react'
import { CATEGORIES_PRODUITS, SOUS_CATEGORIES_ACCESSOIRES } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80) + '-' + Date.now()
}

export default function ProduitForm({ produit }: { produit?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nom: produit?.nom || '',
    description: produit?.description || '',
    prix: produit?.prix || '',
    prix_promo: produit?.prix_promo || '',
    categorie: produit?.categorie || CATEGORIES_PRODUITS[0].id,
    sous_categorie: produit?.sous_categorie || '',
    stock: produit?.stock || 0,
    en_vedette: produit?.en_vedette || false,
    actif: produit?.actif ?? true,
    images: produit?.images || [] as string[],
  })

  const uploadImages = async (files: FileList) => {
    setUploadingImages(true)
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `produits/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
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
    setError('')
    try {
      const payload = {
        nom: form.nom,
        description: form.description,
        prix: Number(form.prix),
        prix_promo: form.prix_promo ? Number(form.prix_promo) : null,
        categorie: form.categorie,
        sous_categorie: form.categorie === 'accessoires' ? form.sous_categorie : null,
        stock: Number(form.stock),
        en_vedette: form.en_vedette,
        actif: form.actif,
        images: form.images,
        slug: produit?.slug || slugify(form.nom),
      }

      if (produit?.id) {
        const res = await fetch('/api/admin/produits', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: produit.id, ...payload }),
        })
        if (!res.ok) throw new Error(await res.text())
      } else {
        const res = await fetch('/api/admin/produits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(await res.text())
      }
      setSuccess(true)
      setTimeout(() => router.push('/admin/produits'), 1500)
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <CheckCircle size={60} className="text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Produit enregistré !</h3>
        <p className="text-gray-500 text-sm mt-1">Redirection en cours...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Informations générales</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
          <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            placeholder="Ex: Lampadaire Solaire 100W" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
            placeholder="Description détaillée du produit, caractéristiques techniques..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
          <select required value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value, sous_categorie: '' })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white">
            {CATEGORIES_PRODUITS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        {form.categorie === 'accessoires' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sous-catégorie accessoire</label>
            <select value={form.sous_categorie} onChange={(e) => setForm({ ...form, sous_categorie: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white">
              <option value="">— Choisir une sous-catégorie —</option>
              {SOUS_CATEGORIES_ACCESSOIRES.map((sc) => <option key={sc.id} value={sc.id}>{sc.label}</option>)}
            </select>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA) *</label>
            <input type="number" required min="0" value={form.prix} onChange={(e) => setForm({ ...form, prix: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="50000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix promo (FCFA)</label>
            <input type="number" min="0" value={form.prix_promo} onChange={(e) => setForm({ ...form, prix_promo: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Optionnel" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.en_vedette} onChange={(e) => setForm({ ...form, en_vedette: e.target.checked })}
              className="w-4 h-4 rounded accent-amber-500" />
            <span className="text-sm font-medium text-gray-700">Mettre en vedette (page d&apos;accueil)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.actif} onChange={(e) => setForm({ ...form, actif: e.target.checked })}
              className="w-4 h-4 rounded accent-green-500" />
            <span className="text-sm font-medium text-gray-700">Produit actif (visible sur le site)</span>
          </label>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3 mb-4">Photos du produit</h2>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-xl p-8 cursor-pointer transition-colors mb-4">
          <Upload size={32} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 font-medium">Cliquez pour uploader des photos</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — Max 5MB par image</p>
          <input type="file" multiple accept="image/*" className="hidden"
            onChange={(e) => e.target.files && uploadImages(e.target.files)} />
        </label>
        {uploadingImages && <p className="text-sm text-amber-600 font-medium mb-3">⏳ Upload en cours...</p>}
        {form.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {form.images.map((url: string) => (
              <div key={url} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
          ❌ Erreur : {error}
        </div>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={loading}
          className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-4 rounded-xl transition-colors">
          {loading ? 'Enregistrement...' : produit ? 'Mettre à jour' : 'Publier le produit'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  )
}
