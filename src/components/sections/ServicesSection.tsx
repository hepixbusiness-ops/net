import Link from 'next/link'
import { Sun, Droplets, Lightbulb, Wrench, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'installation_solaire',
    icon: Sun,
    titre: 'Installation Solaire',
    description: 'Conception et installation de systèmes solaires pour résidences, entreprises et bâtiments industriels. Étude personnalisée, installation professionnelle et mise en service.',
    lien: '/services#installation',
    couleur: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    id: 'pompage_solaire',
    icon: Droplets,
    titre: 'Pompage Solaire',
    description: 'Solutions de pompage alimentées par l\'énergie solaire pour l\'irrigation agricole, l\'alimentation en eau potable et les besoins industriels.',
    lien: '/services#pompage',
    couleur: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'eclairage_solaire',
    icon: Lightbulb,
    titre: 'Éclairage Solaire',
    description: 'Installation de lampadaires solaires pour rues, parking, stades et zones rurales. Solutions autonomes sans raccordement au réseau électrique.',
    lien: '/services#eclairage',
    couleur: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    titre: 'Maintenance & SAV',
    description: 'Service après-vente, entretien préventif et curatif de vos installations solaires. Intervention rapide sur toute l\'étendue du territoire camerounais.',
    lien: '/services#maintenance',
    couleur: 'bg-purple-50 text-purple-600 border-purple-200',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Nos Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            De l&apos;installation à la maintenance, nous vous accompagnons dans tous vos projets d&apos;énergie solaire.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 border ${service.couleur}`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-bold text-blue-900 text-lg mb-3">{service.titre}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <Link
                  href={service.lien}
                  className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm hover:text-amber-700"
                >
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Demander un devis gratuit <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
