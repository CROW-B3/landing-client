'use client'

import { motion } from 'framer-motion'
import { Globe } from './Globe'

interface AboutSectionProps {
  label?: string
  title?: string
  subtitle?: string
  description?: string
}

export function AboutSection({
  label = 'ABOUT',
  title = 'CROW',
  subtitle = '(Cognitive Reasoning Observation Watcher)',
  description = 'Unifies website analytics, CCTV insights, and social feedback into one model - showing real shopper behaviour across every channel.',
}: AboutSectionProps) {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center px-8 py-20 bg-black overflow-hidden">
      {/* Spreading light effect from top - only bottom half visible */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: '-70%',
          width: '130%',
          height: '100vh',
          background: 'radial-gradient(circle at center, rgba(60, 40, 100, 0.9), rgba(50, 30, 80, 0.7) 25%, rgba(40, 20, 70, 0.6) 45%, rgba(30, 15, 50, 0.4) 65%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Text content */}
        <motion.div
          className="relative h-full flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Label at the top */}
          <div className="text-white/40 text-sm font-mono tracking-wider mb-12 lg:mb-auto">
            [{label}]
          </div>

          {/* Title and Description centered vertically */}
          <div className="flex-grow flex flex-col justify-center">
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/60 via-white/40 to-white/20" />

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-6xl md:text-7xl font-semibold text-white mb-2">
                    {title}
                  </h2>
                  <p className="text-[#6D6D6D] text-sm font-normal tracking-wide">
                    {subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#CDAAFFD2] text-2xl leading-relaxed max-w-xl">
                  Unifies website analytics, CCTV
                  <br />
                  insights, and social feedback into one
                  <br />
                  model - showing real shopper
                  <br />
                  behaviour across every channel.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Globe */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Globe />
        </motion.div>
      </div>
    </section>
  )
}
