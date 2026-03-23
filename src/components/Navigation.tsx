import { Button, Navbar, NavLink } from '@b3-crow/ui-kit'
import { ENV } from '@/lib/env'

export function Navigation() {
  return (
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
  )
}
