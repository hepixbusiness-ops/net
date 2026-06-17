'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Camera, FileText, ShoppingBag, MessageSquare, ExternalLink } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/admin/produits', icon: Package, label: 'Produits' },
  { href: '/admin/realisations', icon: Camera, label: 'Réalisations' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/commandes', icon: ShoppingBag, label: 'Commandes' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-sm">N</div>
          <div>
            <p className="font-bold text-sm">NET Solaire</p>
            <p className="text-amber-400 text-xs">Administration</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-amber-500 text-white'
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-blue-300 hover:text-white text-sm"
        >
          <ExternalLink size={16} /> Voir le site
        </a>
      </div>
    </aside>
  )
}
