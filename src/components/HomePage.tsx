import { AnimatedBackground } from '@b3-crow/ui-kit'
import { aboutContent } from '../config/content'
import { AboutSection } from './AboutSection'
import { DocumentationSection } from './DocumentationSection'
import { FeaturesSection } from './FeaturesSection'
import { Footer } from './Footer'
import { HeroSection } from './HeroSection'
import { MobileLanding } from './MobileLanding'
import { Navigation } from './Navigation'
import { PricingSection } from './PricingSection'

export function HomePage() {
  return (
    <div class="overflow-x-hidden relative" onDragStart={e => e.preventDefault()}>
      {/* Mobile (<lg): standalone redesign with its own background + chat */}
      <div class="lg:hidden">
        <MobileLanding />
      </div>

      {/* Desktop (lg+): existing layout, unchanged.
          Use max-lg:hidden (not `hidden lg:block`) — the `hidden` base class
          was winning the cascade over `lg:block`, blanking desktop. */}
      <div class="max-lg:hidden relative">
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
    </div>
  )
}
