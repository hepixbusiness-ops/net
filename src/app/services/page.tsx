import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Sun, Droplets, Lightbulb, Wrench, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { SITE, IMAGES } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services — Installation Solaire & Pompage',
  description: 'New Energy Technology SARL : installations solaires, pompage solaire, éclairage solaire et maintenance au Cameroun.',
}

const services = [
  {
    id: 'installation',
    icon: Sun,
    titre: 'Installation Solaire',
    image: IMAGES.heroPanneaux,
    description: 'Nous concevons et installons des systèmes solaires sur mesure pour particuliers, entreprises et institutions. Chaque projet commence par une étude de vos besoins énergétiques pour dimensionner la solution idéale.',
    avantages: [
      'Étude et dimensionnement gratuits',
      'Panneaux solaires haute efficacité (mono/polycristallin)',
      'Installation par des techniciens certifiés',
      'Mise en service et test complet',
      'Garantie installation 2 ans',
      'Économies d\'électricité dès le 1er jour',
    ],
  },
  {
    id: 'pompage',
    icon: Droplets,
    titre: 'Pompage Solaire',
    image: IMAGES.heroPompage,
    description: 'Nos systèmes de pompage solaire alimentent en eau potable et en eau d\'irrigation des milliers de foyers et d\'exploitations agricoles au Cameroun, sans dépendre du réseau électrique.',
    avantages: [
      'Pompes immergées et de surface',
      'Systèmes de 0,5 à 30 kW',
      'Contrôleur solaire MPPT intégré',
      'Fonctionnement 100% solaire ou hybride',
      'Idéal pour puits, forages, lacs',
      'Adapté à l\'irrigation agricole',
    ],
  },
  {
    id: 'eclairage',
    icon: Lightbulb,
    titre: 'Éclairage Solaire',
    image: IMAGES.heroLampadaire,
    description: 'Nos lampadaires solaires équipent rues, parkings, stades et zones rurales. Solutions entièrement autonomes, sans raccordement au réseau, avec allumage automatique au coucher du soleil.',
    avantages: [
      'Lampadaires tout-en-un (panneau intégré)',
      'Autonomie 3 jours sans ensoleillement',
      'LED haute luminosité longue durée',
      'Capteur crépusculaire automatique',
      'Installation rapide (1 poteau)',
      'Idéal pour voiries et zones hors réseau',
    ],
  },
  {
    id: 'maintenance',
    icon: Wrench,
    titre: 'Maintenance & SAV',
    image: IMAGES.heroMaintenance,
    description: 'Nous assurons l\'entretien préventif et curatif de toutes vos installations solaires. Notre équipe intervient rapidement sur tout le territoire camerounais pour préserver la performance de vos systèmes.',
    avantages: [
      'Contrats de maintenance annuels',
      'Nettoyage et inspection des panneaux',
      'Vérification du câblage et des connexions',
      'Remplacement pièces défectueuses',
      'Rapport d\'intervention détaillé',
      'Hotline technique disponible',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="relative bg-[#1E3A5F] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src={IMAGES.heroPanneaux} alt="" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-[#B83232] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">Ce que nous faisons</span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Nos Services</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Expert en énergie solaire au Cameroun — installations, pompage, éclairage et maintenance.
            </p>
          </div>
        </div>

        {/* Services détaillés */}
        {services.map((service, index) => {
          const Icon = service.icon
          const isEven = index % 2 === 0
          return (
            <section key={service.id} id={service.id} className={`py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={isEven ? '' : 'lg:order-2'}>
                    {service.image ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <Image src={service.image} alt={service.titre} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-video rounded-2xl bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center shadow-xl">
                        <Icon size={80} className="text-[#B83232] opacity-30" />
                      </div>
                    )}
                  </div>

                  {/* Texte */}
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#B83232]/10 rounded-xl flex items-center justify-center">
                        <Icon size={24} className="text-[#B83232]" />
                      </div>
                      <span className="text-[#B83232] font-bold uppercase text-sm tracking-widest">Service</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">{service.titre}</h2>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.avantages.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle size={18} className="text-[#B83232] shrink-0 mt-0.5" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 bg-[#B83232] hover:bg-red-800 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                      Demander un devis <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA final */}
        <section className="bg-[#1E3A5F] py-16 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Un projet ? Parlons-en.</h2>
            <p className="text-blue-200 mb-8">Devis gratuit, étude personnalisée, intervention rapide partout au Cameroun.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#B83232] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl transition-colors">
                Demander un devis gratuit <ArrowRight size={18} />
              </Link>
              <a href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl transition-colors border border-white/20">
                <Phone size={18} /> {SITE.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
