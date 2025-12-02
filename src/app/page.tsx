'use client'

import { AnimatedBackground, HeroText, Logo, Subtitle, TypewriterText } from '@b3-crow/ui-kit'

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Logo />
      <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden" style={{ paddingBottom: '15vh' }}>
        <HeroText />
        <TypewriterText/>
        <Subtitle />
      </div>
    </>
  )
}