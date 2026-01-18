import { ReactLenis } from 'lenis/react'
import React from 'react'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Lenis handles RAF internally when autoRaf is true
        autoRaf: true,

        // Let Lenis handle anchor links
        anchors: {
          offset: 0,
          duration: 1.2,
        },

        // Tuning options
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
