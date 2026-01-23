import { AnimatedBackground, HeroText, Logo, Subtitle, TypewriterText } from '@b3-crow/ui-kit'

export function ComingSoonPage() {
  return (
    <div onDragStart={e => e.preventDefault()}>
      <AnimatedBackground />
      <Logo src="/favicon.webp" alt="CROW Logo" />
      <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden select-none pb-[15vh]">
        <HeroText text="CROW" />
        <TypewriterText text="COMING SOON" />
        <Subtitle>
          We are thrilled to unveil CROW, our most advanced model yet,
          <br />
          blending superior reasoning with extensive pretraining knowledge.
        </Subtitle>
      </div>
    </div>
  )
}
