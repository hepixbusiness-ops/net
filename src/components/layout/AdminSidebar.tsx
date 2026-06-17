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
    <aside className="w-64 bg-[#1E3A5F] text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#B83232] rounded-lg flex items-center justify-center font-bold text-sm">N</div>
          <div>
            <p className="font-bold text-sm">NET Solaire</p>
            <p className="text-[#B83232] text-xs">Administration</p>
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
                ? 'bg-[#B83232] text-white'
                : 'text-blue-200 hover:bg-white/10 hover:text-white'
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
