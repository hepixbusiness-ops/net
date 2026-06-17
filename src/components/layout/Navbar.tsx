'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, ShoppingCart } from 'lucide-react'
import { SITE } from '@/lib/constants'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-blue-900 text-sm leading-tight">NEW ENERGY</p>
              <p className="text-amber-500 text-xs font-semibold">TECHNOLOGY SARL</p>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-amber-500 font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className="hidden sm:flex items-center gap-1 text-sm text-green-700 font-semibold hover:text-green-900"
            >
              <Phone size={16} />
              {SITE.phone}
            </a>
            <Link
              href="/boutique"
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors hidden md:block"
            >
              Commander
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-amber-500"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-2 py-3 text-green-700 font-semibold"
          >
            <Phone size={16} />
            {SITE.phone}
          </a>
        </div>
      )}
    </header>
  )
}
