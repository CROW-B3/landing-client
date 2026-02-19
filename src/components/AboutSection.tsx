import type { AboutSectionProps } from '@/types'
import { Globe } from '@b3-crow/ui-kit'

export function AboutSection({
  label = 'ABOUT',
  title = 'CROW',
  subtitle = '(Cognitive Reasoning Observation Watcher)',
  description = 'Unifies website analytics, CCTV insights, and social feedback into one model - showing real shopper behaviour across every channel.',
}: AboutSectionProps) {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
        <div className="relative h-full flex flex-col animate-slide-in-left">
          <div className="text-white/40 text-sm font-mono tracking-wider mb-12 lg:mb-auto">
            [
            {label}
            ]
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/60 via-white/40 to-white/20" />

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-2">
                    {title}
                  </h2>
                  <p className="text-[#6D6D6D] text-xs sm:text-sm font-normal tracking-wide">
                    {subtitle}
                  </p>
                </div>

                <p className="text-[#CDAAFFD2] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center -mt-8 sm:-mt-12 lg:mt-0 animate-slide-in-right ml-40">
          <div className="transform scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-center">
            <Globe size={800} />
          </div>
        </div>
      </div>
    </section>
  )
}
