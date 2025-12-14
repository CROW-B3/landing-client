'use client'

import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { DocumentationSection } from '@/components/DocumentationSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div onDragStart={(e) => e.preventDefault()}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <DocumentationSection />
      <Footer />
    </div>
  )
}