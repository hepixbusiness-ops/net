import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function CTASection() {
  return (
    <section className="py-20 bg-amber-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Prêt à passer à l&apos;énergie solaire ?
        </h2>
        <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
          Obtenez votre devis gratuit en 24h. Nos experts vous accompagnent de la conception à l&apos;installation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors text-lg"
          >
            Demander un devis gratuit <ArrowRight size={20} />
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-700 transition-colors text-lg"
          >
            <Phone size={20} /> Nous appeler
          </a>
        </div>
      </div>
    </section>
  )
}
