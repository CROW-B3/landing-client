import { Button, Navbar, NavLink } from '@b3-crow/ui-kit'
import { Menu, X } from 'lucide-preact'
import { useState } from 'preact/hooks'
import { ENV } from '@/lib/env'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Plans' },
  { href: '#documentation', label: 'Docs' },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop / tablet navbar (ui-kit) — hidden on mobile */}
      <div class="hidden md:block">
        <Navbar
          variant="centered"
          logo={{
            src: '/favicon.webp',
            alt: 'CROW Logo',
          }}
          centerContent={(
            <>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Plans</NavLink>
              <NavLink href="#documentation">Docs</NavLink>
            </>
          )}
          rightContent={(
            <Button variant="outline" href={ENV.PUBLIC_CROW_APP_URL}>
              Try CROW
            </Button>
          )}
          containerClassName="fixed top-0 left-0 right-0 z-50"
          className="px-8 py-4"
          centerContentClassName="gap-12"
        />
      </div>

      {/* Mobile navbar — logo + hamburger that toggles a dropdown */}
      <div class="md:hidden fixed top-0 left-0 right-0 z-50">
        <div class="flex items-center justify-between px-5 py-4">
          <a href="/" class="flex items-center" aria-label="CROW home">
            <img src="/favicon.webp" alt="CROW Logo" width="36" height="36" class="h-9 w-auto object-contain" />
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white active:scale-95"
          >
            {open ? <X class="h-5 w-5" /> : <Menu class="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div class="animate-slide-up-fade mx-4 mt-1 rounded-2xl border border-white/10 bg-black/85 p-2 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
            <nav class="flex flex-col">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  class="rounded-xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div class="mt-2 px-1 pb-1">
              <Button variant="primary" fullWidth href={ENV.PUBLIC_CROW_APP_URL}>
                Try CROW
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
