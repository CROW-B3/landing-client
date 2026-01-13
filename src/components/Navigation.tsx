'use client'

import { Navbar, NavLink, Button } from '@b3-crow/ui-kit'

export function Navigation() {
  return (
    <Navbar
      variant="centered"
      logo={{
        src: '/favicon.webp',
        alt: 'CROW Logo',
      }}
      centerContent={
        <>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Plans</NavLink>
          <NavLink href="#documentation">Docs</NavLink>
        </>
      }
      rightContent={
        <a
          href={process.env['NEXT_PUBLIC_AUTH_URL'] || '#'}
          className="rounded-full transition-all font-medium flex items-center justify-center gap-2 whitespace-nowrap border border-white/30 text-white/90 hover:text-white hover:border-white/50 hover:bg-white/5 px-4 py-2.5 text-sm"
        >
          Try CROW
        </a>
      }
      containerClassName="fixed top-0 left-0 right-0 z-50"
      className="px-8 py-4"
      centerContentClassName="gap-12"
    />
  )
}
