'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Package, Camera, FileText, ShoppingBag, MessageSquare, ExternalLink, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/admin/produits', icon: Package, label: 'Produits' },
  { href: '/admin/realisations', icon: Camera, label: 'Réalisations' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/commandes', icon: ShoppingBag, label: 'Commandes' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
]

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  return (
    <>
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#B83232] rounded-lg flex items-center justify-center font-bold text-sm">N</div>
          <div>
            <p className="font-bold text-sm">NET Solaire</p>
            <p className="text-[#B83232] text-xs">Administration</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === href ? 'bg-[#B83232] text-white' : 'text-blue-200 hover:bg-white/10 hover:text-white'
            }`}>
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-blue-800">
        <a href="/" target="_blank" className="flex items-center gap-2 text-blue-300 hover:text-white text-sm">
          <ExternalLink size={16} /> Voir le site
        </a>
      </div>
    </>
  )
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#1E3A5F] text-white flex items-center px-4 py-3 gap-3 shadow-lg">
        <button onClick={() => setOpen(true)} className="text-white">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#B83232] rounded-lg flex items-center justify-center font-bold text-xs">N</div>
          <p className="font-bold text-sm">NET Solaire — Admin</p>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#1E3A5F] text-white flex flex-col min-h-screen">
            <NavContent onClose={() => setOpen(false)} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-[#1E3A5F] text-white min-h-screen flex-col shrink-0">
        <NavContent />
      </aside>
    </>
  )
}
