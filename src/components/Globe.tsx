'use client'

import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineShare } from "react-icons/hi";
import { BsGlobe2 } from "react-icons/bs";
import { BiCctv } from "react-icons/bi";

interface GlobePoint {
  label: string
  icon: React.ReactNode
  position: { x: number; y: number }
}

interface GlobeProps {
  points?: GlobePoint[]
  size?: number
}

export function Globe({ points, size = 500 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const defaultPoints: GlobePoint[] = [
    { label: 'Internet', icon: <BsGlobe2 className="text-xl" />, position: { x: 50, y: 25 } },
    { label: 'CCTV', icon: <BiCctv className="text-xl" />, position: { x: 25, y: 50 } },
    { label: 'Social Media', icon: <HiOutlineShare className="text-xl" />, position: { x: 75, y: 55 } },
  ]

  const displayPoints = points || defaultPoints

  useEffect(() => {
    let phi = 0

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.54, 0.68, 1],
      glowColor: [0.2, 0.2, 0.3],
      markers: [],
      onRender: (state) => {
        // Auto-rotate the globe
        state.phi = phi
        phi += 0.003
      },
    })

    return () => {
      globe.destroy()
    }
  }, [size])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* 3D Globe Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          maxWidth: '100%',
          aspectRatio: '1',
        }}
      />

      {/* Data points with labels - positioned inside the globe */}
      {displayPoints.map((point, index) => (
        <motion.div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${point.position.x}%`,
            top: `${point.position.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.2 }}
        >
          <div className="relative group">
            {/* Icon circle */}
            <div className="w-14 h-14 rounded-full bg-black/60 border border-white/40 backdrop-blur-sm flex items-center justify-center group-hover:border-white/60 transition-colors text-white">
              {point.icon}
            </div>

            {/* Label */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs text-white/70 font-medium">{point.label}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
