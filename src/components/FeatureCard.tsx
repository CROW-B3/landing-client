'use client'

import { motion } from 'framer-motion'
import { LuArrowUpRight } from "react-icons/lu";

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  isFirst?: boolean
  isLast?: boolean
}

export function FeatureCard({ title, description, icon, index, isFirst = false, isLast = false }: FeatureCardProps) {
  const borderClasses = `${isFirst ? 'border-l' : ''} ${!isLast ? 'border-r' : ''} ${isLast ? 'border-r' : ''} border-white/10`

  return (
    <motion.div
      className={`relative p-8 flex flex-col h-full bg-black/40 backdrop-blur-sm group ${borderClasses}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Title */}
      <h3 className="text-2xl font-semibold text-white mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#CDAAFF] text-sm leading-relaxed mb-8">
        {description}
      </p>

      {/* Icon/Visual */}
      <div className="flex-grow flex items-center justify-center my-8">
        <div className="w-full h-28 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Try Now Button */}
      <div className="flex justify-center">
        <button className="mt-5 px-4 py-2 border border-white/30 rounded-full text-white/90 hover:text-white hover:border-white/50 transition-all text-sm font-medium flex items-center gap-2 w-fit group-hover:bg-white/5">
          Try Now
          <LuArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
