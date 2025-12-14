'use client'

import { Logo } from '@b3-crow/ui-kit'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center">
      <Logo src="/favicon.webp" alt="CROW Logo" />

      <div className="absolute left-1/2 -translate-x-1/2 flex gap-12 items-center">
        <a
          href="#about"
          className="text-white/90 hover:text-white transition-colors text-sm font-medium"
        >
          About
        </a>
        <a
          href="#features"
          className="text-white/90 hover:text-white transition-colors text-sm font-medium"
        >
          Features
        </a>
        <a
          href="#documentation"
          className="text-white/90 hover:text-white transition-colors text-sm font-medium"
        >
          Docs
        </a>
      </div>

      <button className="ml-auto px-6 py-2 border border-white/30 rounded-full text-white/90 hover:text-white hover:border-white/50 transition-all text-sm font-medium">
        Try CROW
      </button>
    </nav>
  )
}
