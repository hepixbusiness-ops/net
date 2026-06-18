import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { SITE, IMAGES } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-1.5">
                <Image
                  src={IMAGES.logo}
                  alt="NEW ENERGY TECHNOLOGY SARL"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">NEW ENERGY</p>
                <p className="text-[#B83232] text-xs font-semibold">TECHNOLOGY SARL</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">{SITE.slogan}</p>
            <div className="flex gap-3">
              {[
                { href: SITE.reseaux.facebook, label: 'f' },
                { href: SITE.reseaux.instagram, label: 'in' },
                { href: SITE.reseaux.linkedin, label: 'li' },
              ].map(({ href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-[#B83232] rounded-full flex items-center justify-center transition-colors text-xs font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[#B83232] mb-4 uppercase text-xs tracking-widest">Nos Services</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {[
                ['Installation Solaire', '/services#installation'],
                ['Pompage Solaire', '/services#pompage'],
                ['Éclairage Solaire', '/services#eclairage'],
                ['Maintenance', '/services#maintenance'],
                ['Devis Gratuit', '/contact'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-[#B83232] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="font-semibold text-[#B83232] mb-4 uppercase text-xs tracking-widest">Boutique</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {[
                ['Lampadaires Solaires', 'lampadaires'],
                ['Panneaux Solaires', 'panneaux_solaires'],
                ['Batteries', 'batteries'],
                ['Pompes Solaires', 'pompes_solaires'],
                ['Kits Complets', 'kits_solaires'],
              ].map(([label, cat]) => (
                <li key={cat}><Link href={`/boutique?categorie=${cat}`} className="hover:text-[#B83232] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#B83232] mb-4 uppercase text-xs tracking-widest">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-[#B83232] shrink-0" />
                {SITE.adresse}
              </li>
              {SITE.phones.map((num) => (
                <li key={num} className="flex items-center gap-2">
                  <Phone size={16} className="text-[#B83232] shrink-0" />
                  <a href={`tel:${num.replace(/\s/g,'')}`} className="hover:text-[#B83232]">{num}</a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#B83232] shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-[#B83232]">{SITE.email}</a>
              </li>
            </ul>
            <Link href="/contact"
              className="mt-5 inline-block bg-[#B83232] hover:bg-red-800 text-white text-sm font-bold px-5 py-3 rounded-lg transition-colors">
              Demander un devis gratuit
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:text-[#B83232] transition-colors">Blog</Link>
            <Link href="/realisations" className="hover:text-[#B83232] transition-colors">Réalisations</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
