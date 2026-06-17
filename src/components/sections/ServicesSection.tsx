import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { IMAGES } from '@/lib/constants'

const services = [
  {
    id: 'installation_solaire',
    image: IMAGES.heroPanneaux,
    titre: 'Installation Solaire',
    description: 'Conception et installation de systèmes solaires pour résidences, entreprises et bâtiments industriels. Étude personnalisée et mise en service.',
    lien: '/services#installation',
  },
  {
    id: 'pompage_solaire',
    image: IMAGES.heroPompage,
    titre: 'Pompage Solaire',
    description: 'Solutions de pompage alimentées par l\'énergie solaire pour l\'irrigation agricole, l\'alimentation en eau potable et les besoins industriels.',
    lien: '/services#pompage',
  },
  {
    id: 'eclairage_solaire',
    image: null,
    titre: 'Éclairage Solaire',
    description: 'Installation de lampadaires solaires pour rues, parkings, stades et zones rurales. Solutions autonomes sans raccordement au réseau.',
    lien: '/services#eclairage',
  },
  {
    id: 'maintenance',
    image: null,
    titre: 'Maintenance & SAV',
    description: 'Service après-vente, entretien préventif et curatif de vos installations solaires. Intervention rapide sur tout le Cameroun.',
    lien: '/services#maintenance',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#B83232] text-sm font-bold uppercase tracking-widest">Ce que nous faisons</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mt-2 mb-4">
            Nos Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            De l&apos;installation à la maintenance, nous vous accompagnons dans tous vos projets d&apos;énergie solaire au Cameroun.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
              {/* Image ou placeholder */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.titre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50 text-5xl">
                    {service.id === 'eclairage_solaire' ? '💡' : '🔧'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-[#B83232] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {service.titre}
                </span>
              </div>

              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <Link
                  href={service.lien}
                  className="inline-flex items-center gap-1 text-[#B83232] font-semibold text-sm hover:gap-2 transition-all"
                >
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Demander un devis gratuit <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
