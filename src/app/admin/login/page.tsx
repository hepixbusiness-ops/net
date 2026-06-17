'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock } from 'lucide-react'
import { IMAGES } from '@/lib/constants'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      setError('Mot de passe incorrect.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1E3A5F] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#1E3A5F] rounded-xl p-3 mb-4">
            <Image src={IMAGES.logo} alt="NET" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-[#1E3A5F]">Espace Administrateur</h1>
          <p className="text-gray-400 text-sm mt-1">New Energy Technology SARL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B83232] text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B83232] hover:bg-red-800 disabled:bg-red-300 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
