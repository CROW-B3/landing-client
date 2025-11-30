'use client'

import { AnimatedBackground, HeroText, Logo, Subtitle, ComingSoon } from '@b3-crow/ui-kit'

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Logo />
      <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden" style={{ paddingBottom: '15vh' }}>
        <HeroText />
        <ComingSoon />
        <Subtitle />
      </div>
    </>
  )
}