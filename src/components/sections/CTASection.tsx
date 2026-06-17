import Link from 'next/link'
import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'
import { SITE, IMAGES } from '@/lib/constants'

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Fond image pompage */}
      <Image
        src={IMAGES.heroPompage}
        alt="Pompage solaire"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#1E3A5F]/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="inline-block bg-[#B83232] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Passez à l&apos;action
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          Prêt à passer à l&apos;énergie solaire ?
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
          Devis gratuit sous 24h. Nos experts vous accompagnent de la conception à l&apos;installation partout au Cameroun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#B83232] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg"
          >
            Demander un devis gratuit <ArrowRight size={20} />
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#1E3A5F] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg shadow-lg"
          >
            <Phone size={20} /> Nous appeler
          </a>
        </div>
      </div>
    </section>
  )
}
