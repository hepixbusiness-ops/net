import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-8xl font-bold text-[#B83232] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#1E3A5F] mb-3">Page introuvable</h1>
        <p className="text-gray-500 mb-8">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="bg-[#B83232] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Retour à l&apos;accueil
        </Link>
      </main>
      <Footer />
    </>
  )
}
