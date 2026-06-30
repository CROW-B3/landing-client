import { HeroText, InputField, Subtitle } from '@b3-crow/ui-kit'
import { ChevronDown, Github } from 'lucide-preact'
import { useState } from 'react'

export function HeroSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Hand the question to the chat page, which runs it against /api/chat.
  const handleSubmit = (query: string) => {
    const q = query.trim()
    if (!q || isSubmitting)
      return
    setIsSubmitting(true)
    window.location.href = `/ask/c?q=${encodeURIComponent(q)}`
  }

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center select-none px-4 lg:px-0">
      <div className="flex flex-col items-center gap-8 w-full lg:w-auto">
        <div className="scale-50 sm:scale-75 lg:scale-100">
          <HeroText text="CROW" />
        </div>

        <InputField
          placeholder="Ask CROW Anything..."
          onSubmit={handleSubmit}
          disabled={isSubmitting}
        />

        <a
          href="https://github.com/CROW-B3"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-white"
        >
          <Github className="w-4 h-4" />
          <span>View CROW on GitHub</span>
        </a>
      </div>

      <div className="absolute bottom-24 px-4">
        <Subtitle>
          <span className="hidden sm:inline">
            We are thrilled to unveil CROW, our most advanced model yet,
            <br />
            blending superior reasoning with extensive pretraining knowledge.
          </span>
          <span className="sm:hidden text-center">We are thrilled to unveil CROW, our most advanced model yet, blending superior reasoning with extensive pretraining knowledge.</span>
        </Subtitle>
      </div>

      <div className="absolute bottom-8 left-8">
        <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </section>
  )
}
