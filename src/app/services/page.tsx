import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Sun, Droplets, Lightbulb, Wrench, Camera, Zap, Pipette, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { SITE, IMAGES } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services — Solaire, Électricité, Vidéosurveillance & Plomberie',
  description: 'New Energy Technology SARL : installations solaires, vidéosurveillance, électricité générale et plomberie sanitaire au Cameroun.',
}

const servicesSolaires = [
  {
    id: 'installation',
    icon: Sun,
    titre: 'Installation Solaire',
    image: IMAGES.heroPanneaux,
    description: 'Nous concevons et installons des systèmes solaires sur mesure pour particuliers, entreprises et institutions. Chaque projet commence par une étude de vos besoins énergétiques.',
    prestations: [
      'Étude et dimensionnement gratuits',
      'Panneaux solaires haute efficacité',
      'Installation par techniciens certifiés',
      'Mise en service et test complet',
      'Garantie installation 2 ans',
      'Économies dès le 1er jour',
    ],
  },
  {
    id: 'pompage',
    icon: Droplets,
    titre: 'Pompage Solaire',
    image: IMAGES.heroPompage,
    description: 'Nos systèmes alimentent en eau des milliers de foyers et exploitations agricoles sans dépendre du réseau électrique.',
    prestations: [
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
    description: 'Nos lampadaires solaires équipent rues, parkings et zones rurales. Solutions autonomes avec allumage automatique.',
    prestations: [
      'Lampadaires tout-en-un (panneau intégré)',
      'Autonomie 3 jours sans ensoleillement',
      'LED haute luminosité longue durée',
      'Capteur crépusculaire automatique',
      'Installation rapide (1 poteau)',
      'Idéal pour zones hors réseau',
    ],
  },
  {
    id: 'maintenance',
    icon: Wrench,
    titre: 'Maintenance & SAV',
    image: IMAGES.heroMaintenance,
    description: 'Entretien préventif et curatif de toutes vos installations solaires. Intervention rapide sur tout le territoire.',
    prestations: [
      'Contrats de maintenance annuels',
      'Nettoyage et inspection des panneaux',
      'Vérification câblage et connexions',
      'Remplacement pièces défectueuses',
      'Rapport d\'intervention détaillé',
      'Hotline technique disponible',
    ],
  },
]

const autresServices = [
  {
    id: 'videosurveillance',
    icon: Camera,
    couleur: '#1E3A5F',
    titre: 'Vidéo Surveillance',
    emoji: '📹',
    description: 'Sécurisez vos locaux, domiciles et entreprises avec nos systèmes de vidéosurveillance professionnels. Installation, configuration et maintenance par nos techniciens certifiés.',
    prestations: [
      { label: 'Caméras IP & Caméras analogiques HD' },
      { label: 'Kits de vidéosurveillance clé en main' },
      { label: 'Enregistreurs DVR / NVR' },
      { label: 'Caméras intérieures et extérieures' },
      { label: 'Caméras motorisées PTZ' },
      { label: 'Accès à distance sur smartphone' },
      { label: 'Audit de sécurité gratuit' },
      { label: 'Contrats de maintenance' },
      { label: 'Dépannage et remplacement rapide' },
    ],
    avantagesCles: [
      { titre: 'Surveillance 24h/24', desc: 'Visionnez en temps réel depuis votre téléphone partout dans le monde' },
      { titre: 'Installation professionnelle', desc: 'Câblage discret, positionnement optimisé, réglages personnalisés' },
      { titre: 'SAV réactif', desc: 'Intervention sous 24h en cas de panne ou de dysfonctionnement' },
    ],
  },
  {
    id: 'electricite',
    icon: Zap,
    couleur: '#F59E0B',
    titre: 'Électricité Générale',
    emoji: '⚡',
    description: 'De l\'installation neuve à la rénovation, nos électriciens qualifiés réalisent tous vos travaux électriques résidentiels et industriels dans les règles de l\'art.',
    prestations: [
      { label: 'Installation électrique résidentielle & industrielle' },
      { label: 'Rénovation et mise aux normes' },
      { label: 'Tableaux électriques et armoires' },
      { label: 'Éclairage intérieur et extérieur' },
      { label: 'Installation d\'onduleurs' },
      { label: 'Installation solaire raccordée' },
      { label: 'Dépannage électrique urgent' },
      { label: 'Maintenance préventive' },
      { label: 'Audit énergétique' },
    ],
    avantagesCles: [
      { titre: 'Techniciens qualifiés', desc: 'Électriciens certifiés respectant les normes camerounaises en vigueur' },
      { titre: 'Devis transparent', desc: 'Estimation précise avant intervention, sans surprise ni surcoût caché' },
      { titre: 'Garantie travaux', desc: 'Tous nos travaux électriques sont garantis 1 an pièces et main-d\'œuvre' },
    ],
  },
  {
    id: 'plomberie',
    icon: Pipette,
    couleur: '#0EA5E9',
    titre: 'Plomberie Sanitaire',
    emoji: '🔧',
    description: 'Nos plombiers expérimentés prennent en charge tous vos projets sanitaires : installations neuves, réparations, débouchages et entretien de vos réseaux d\'eau.',
    prestations: [
      { label: 'Installation sanitaire complète' },
      { label: 'Installation de robinetterie' },
      { label: 'Chauffe-eau solaire et électrique' },
      { label: 'Réseaux d\'alimentation en eau' },
      { label: 'Réseaux d\'évacuation et d\'assainissement' },
      { label: 'Réparation de fuites et de tuyaux' },
      { label: 'Débouchage professionnel' },
      { label: 'Installation de pompes et réservoirs' },
      { label: 'Maintenance préventive' },
    ],
    avantagesCles: [
      { titre: 'Intervention rapide', desc: 'Disponibles 6j/7 pour vos urgences plomberie à Yaoundé et environs' },
      { titre: 'Matériaux de qualité', desc: 'Utilisation exclusive de matériaux certifiés pour une durabilité maximale' },
      { titre: 'Propreté garantie', desc: 'Chantier propre, nettoyage systématique après chaque intervention' },
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
              Énergie solaire, électricité, vidéosurveillance et plomberie — votre partenaire technique au Cameroun.
            </p>
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {[
                { href: '#installation', label: '☀️ Solaire' },
                { href: '#videosurveillance', label: '📹 Vidéosurveillance' },
                { href: '#electricite', label: '⚡ Électricité' },
                { href: '#plomberie', label: '🔧 Plomberie' },
              ].map(({ href, label }) => (
                <a key={href} href={href}
                  className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-[#B83232] hover:text-white transition-colors shrink-0">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SECTION SOLAIRE ===== */}
        <section id="installation" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#B83232]/10 text-[#B83232] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">Énergie Renouvelable</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F]">Services Solaires</h2>
              <p className="text-gray-600 mt-3 max-w-xl mx-auto">Notre cœur de métier depuis plus de 10 ans au Cameroun</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesSolaires.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.id} id={s.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative aspect-video">
                      <Image src={s.image} alt={s.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-9 h-9 bg-[#B83232] rounded-lg flex items-center justify-center mb-1">
                          <Icon size={18} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#1E3A5F] text-lg mb-2">{s.titre}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{s.description}</p>
                      <ul className="space-y-1.5">
                        {s.prestations.slice(0, 4).map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle size={13} className="text-[#B83232] shrink-0 mt-0.5" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== AUTRES SERVICES ===== */}
        {autresServices.map((service, index) => {
          const Icon = service.icon
          const isEven = index % 2 === 0
          return (
            <section key={service.id} id={service.id} className={`py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Titre section */}
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: service.couleur + '15' }}>
                    <Icon size={28} style={{ color: service.couleur }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: service.couleur }}>Nos prestations</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F]">{service.titre}</h2>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Prestations */}
                  <div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.prestations.map((p) => (
                        <div key={p.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                          <CheckCircle size={16} className="shrink-0" style={{ color: service.couleur }} />
                          <span className="text-sm text-gray-800 font-medium">{p.label}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-colors mt-8"
                      style={{ backgroundColor: service.couleur }}>
                      Demander un devis <ArrowRight size={18} />
                    </Link>
                  </div>

                  {/* Avantages clés */}
                  <div className="space-y-5">
                    <h3 className="font-bold text-[#1E3A5F] text-xl mb-6">Pourquoi nous choisir ?</h3>
                    {service.avantagesCles.map((av, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold text-white"
                          style={{ backgroundColor: service.couleur }}>
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 mb-1">{av.titre}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{av.desc}</p>
                        </div>
                      </div>
                    ))}

                    {/* CTA contact direct */}
                    <div className="rounded-2xl p-5 text-white mt-4" style={{ backgroundColor: service.couleur }}>
                      <p className="font-bold mb-1">Besoin d'un devis rapide ?</p>
                      <p className="text-sm opacity-80 mb-3">Réponse sous 2h, intervention sous 24h à Yaoundé.</p>
                      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white font-bold text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                        style={{ color: service.couleur }}>
                        WhatsApp →
                      </a>
                    </div>
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
              <a href={`tel:${SITE.phone.replace(/\s/g,'')}`}
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
