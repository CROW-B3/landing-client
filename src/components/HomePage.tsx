import { AnimatedBackground } from '@b3-crow/ui-kit'
import { aboutContent } from '../config/content'
import { AboutSection } from './AboutSection'
import { DocumentationSection } from './DocumentationSection'
import { FeaturesSection } from './FeaturesSection'
import { Footer } from './Footer'
import { HeroSection } from './HeroSection'
import { Navigation } from './Navigation'
import { PricingSection } from './PricingSection'

export function HomePage() {
  return (
    <div class="overflow-x-hidden relative" onDragStart={e => e.preventDefault()}>
      <AnimatedBackground variant="fullscreen" enableVerticalFade={true} fadeIntensity={0.9} />
      <div class="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection {...aboutContent} />
        <FeaturesSection />
        <PricingSection />
        <DocumentationSection />
        <Footer />
      </div>
    </div>
  )
}
