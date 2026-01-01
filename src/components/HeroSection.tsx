'use client'

import { HeroText, Subtitle, InputField } from '@b3-crow/ui-kit'
import { IoChevronDown } from 'react-icons/io5'

export function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center select-none">
      <div className="flex flex-col items-center gap-8">
        <HeroText text="CROW" />

        <InputField
          placeholder="Ask CROW Anything..."
onSubmit={() => { /* TODO: Implement submission logic */ }}
        />
      </div>

      <div className="absolute bottom-24">
        <Subtitle>
          We are thrilled to unveil CROW, our most advanced model yet,
          <br />
          blending superior reasoning with extensive pretraining knowledge.
        </Subtitle>
      </div>

      <div className="absolute bottom-8 left-8">
        <IoChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </section>
  )
}
