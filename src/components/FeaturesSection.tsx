'use client'

import { motion } from 'framer-motion'
import { FeatureCard } from './FeatureCard'
import Image from 'next/image'

export function FeaturesSection() {
  const features = [
    {
      title: 'Interaction',
      description: 'Web, in-store (CCTV), and social signals merged into one clean, queryable interaction model.',
      icon: (
        <Image
          src="/interaction.png"
          alt="Interaction"
          width={200}
          height={100}
          className="h-auto object-contain opacity-30"
        />
      ),
    },
    {
      title: 'API',
      description: 'Endpoints for interactions and summaries, ready to plug into any dashboard or automation.',
      icon: (
        <Image
          src="/api.png"
          alt="API"
          width={200}
          height={60}
          className="h-auto object-contain opacity-30"
        />
      ),
    },
    {
      title: 'Chat',
      description: 'An AI analyst that explains behaviour, spots spikes, compares stores, and answers product questions clearly.',
      icon: (
        <Image
          src="/chat.png"
          alt="Chat"
          width={200}
          height={100}
          className="h-auto object-contain opacity-30"
        />
      ),
    },
  ]

  return (
    <section id="features" className="relative min-h-screen w-full flex items-center justify-center px-8 py-20 bg-black">
      <div className="max-w-7xl w-full">
        {/* Label */}
        <motion.div
          className="text-white/40 text-sm font-mono tracking-wider mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [ FEATURES ]
        </motion.div>

        {/* Feature Cards - Connected with vertical dividers */}
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === features.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
