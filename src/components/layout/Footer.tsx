import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-lg">N</div>
              <div>
                <p className="font-bold text-sm">NEW ENERGY</p>
                <p className="text-amber-400 text-xs">TECHNOLOGY SARL</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{SITE.slogan}</p>
            <div className="flex gap-3">
              <a href={SITE.reseaux.facebook} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href={SITE.reseaux.instagram} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href={SITE.reseaux.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services#installation" className="hover:text-amber-400">Installation Solaire</Link></li>
              <li><Link href="/services#pompage" className="hover:text-amber-400">Pompage Solaire</Link></li>
              <li><Link href="/services#eclairage" className="hover:text-amber-400">Éclairage Solaire</Link></li>
              <li><Link href="/services#maintenance" className="hover:text-amber-400">Maintenance</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400">Demande de Devis</Link></li>
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4">Boutique</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/boutique?categorie=lampadaires" className="hover:text-amber-400">Lampadaires Solaires</Link></li>
              <li><Link href="/boutique?categorie=panneaux_solaires" className="hover:text-amber-400">Panneaux Solaires</Link></li>
              <li><Link href="/boutique?categorie=batteries" className="hover:text-amber-400">Batteries</Link></li>
              <li><Link href="/boutique?categorie=pompes_solaires" className="hover:text-amber-400">Pompes Solaires</Link></li>
              <li><Link href="/boutique?categorie=kits_solaires" className="hover:text-amber-400">Kits Complets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-amber-400 shrink-0" />
                {SITE.adresse}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-amber-400">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-amber-400">{SITE.email}</a>
              </li>
            </ul>
            <Link href="/contact"
              className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Demander un devis gratuit
            </Link>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>
            <Link href="/blog" className="hover:text-amber-400 mr-4">Blog</Link>
            <Link href="/realisations" className="hover:text-amber-400">Nos Réalisations</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
