'use client'

import Link from 'next/link'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-bold text-[#B83232] mb-4">500</p>
      <h1 className="text-2xl font-bold text-[#1E3A5F] mb-3">Une erreur est survenue</h1>
      <p className="text-gray-500 mb-8">Veuillez réessayer ou revenir à l&apos;accueil.</p>
      <div className="flex gap-4">
        <button onClick={reset} className="bg-[#1E3A5F] hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Réessayer
        </button>
        <Link href="/" className="bg-[#B83232] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
