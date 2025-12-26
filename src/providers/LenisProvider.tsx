'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor?.href) {
        const url = new URL(anchor.href)
        const hash = url.hash

        // Check if it's an anchor link on the same page
        if (hash && url.pathname === window.location.pathname) {
          e.preventDefault()
          const targetElement = document.querySelector(hash) as HTMLElement

          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
            })
          }
        }
      }
    }

    // Add click listener
    document.addEventListener('click', handleAnchorClick)

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
