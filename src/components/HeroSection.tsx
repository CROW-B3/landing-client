import { HeroText, InputField, Subtitle } from '@b3-crow/ui-kit'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { createSession } from '@/lib/api/qna'

export function HeroSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isSubmitting)
      return

    setIsSubmitting(true)

    try {
      const session = await createSession()
      window.location.href = `/ask/${session.id}?q=${encodeURIComponent(query.trim())}`
    }
    catch {
      setIsSubmitting(false)
    }
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
        <IoChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </section>
  )
}
