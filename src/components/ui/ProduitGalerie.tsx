'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProduitGalerie({ images, nom }: { images: string[], nom: string }) {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center text-8xl shadow-sm">
        ☀️
      </div>
    )
  }

  return (
    <div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm mb-4 group">
        <img src={images[active]} alt={nom} className="w-full h-full object-cover" />
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`aspect-square rounded-xl overflow-hidden shadow-sm transition-all ${i === active ? 'ring-2 ring-[#B83232]' : 'opacity-70 hover:opacity-100'}`}>
              <img src={img} alt={`${nom} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
