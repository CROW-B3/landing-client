'use client'

import { HeroText, Subtitle, AnimatedBackground } from '@b3-crow/ui-kit'
import { IoChevronDown } from 'react-icons/io5'
import { LuArrowUpRight } from "react-icons/lu";

export function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center select-none">
      <AnimatedBackground />
      <div className="flex flex-col items-center gap-8">
        <HeroText text="CROW" />

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Ask CROW Anything..."
            className="w-full px-6 py-4 pr-14 bg-transparent border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors">
            <LuArrowUpRight className="w-4 h-4 text-white" />
          </button>
        </div>
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
