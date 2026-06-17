import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/ui/ContactForm'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Devis Gratuit',
  description: 'Contactez New Energy Technology SARL pour votre projet solaire au Cameroun. Devis gratuit sous 24h.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-blue-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
            <p className="text-blue-200">Devis gratuit sous 24h — Réponse garantie</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <ContactForm />

            {/* Infos contact */}
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Nos coordonnées</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Adresse', value: SITE.adresse },
                  { icon: Phone, label: 'Téléphone', value: SITE.phone, href: `tel:${SITE.phone}` },
                  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold text-blue-900 hover:text-amber-600">{value}</a>
                      ) : (
                        <p className="font-semibold text-blue-900">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\s|\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-xl transition-colors"
                >
                  <MessageCircle size={24} />
                  Discuter sur WhatsApp
                </a>
              </div>

              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">Horaires d&apos;ouverture</h3>
                <p className="text-gray-600 text-sm">Lundi – Vendredi : 08h00 – 18h00</p>
                <p className="text-gray-600 text-sm">Samedi : 08h00 – 13h00</p>
                <p className="text-gray-500 text-sm mt-2">Urgences techniques : 24h/24 par WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
