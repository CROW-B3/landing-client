import type { DocItem, FeatureItem } from '@/types'
import { AnimatedBackground } from '@b3-crow/ui-kit'
import { MdApi, MdOutlineDeveloperBoard } from 'react-icons/md'
import { RiCodeBoxLine } from 'react-icons/ri'
import { TbLockCode } from 'react-icons/tb'
import { AboutSection } from '@/components/AboutSection'
import { DocumentationSection } from '@/components/DocumentationSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { Navigation } from '@/components/Navigation'
import { PricingSection } from '@/components/PricingSection'
import { aboutContent, docsData, featuresData } from '@/config/content'
import { LenisProvider } from '@/providers/LenisProvider'

const iconMap = {
  TbLockCode,
  MdApi,
  MdOutlineDeveloperBoard,
  RiCodeBoxLine,
}

export function HomePage() {
  const features: FeatureItem[] = featuresData.map(feature => ({
    ...feature,
    icon: (
      <img
        src={feature.imageSrc}
        alt={feature.imageAlt}
        width={feature.imageWidth}
        height={feature.imageHeight}
        className="h-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-500 ease-out"
      />
    ),
  }))

  const docs: DocItem[] = docsData.map((doc) => {
    const IconComponent = iconMap[doc.iconName]
    return {
      ...doc,
      icon: <IconComponent className="w-12 h-12" />,
    }
  })

  return (
    <LenisProvider>
      <div onDragStart={e => e.preventDefault()} className="overflow-x-hidden relative">
        <AnimatedBackground variant="fullscreen" enableVerticalFade={true} fadeIntensity={0.9} />
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
          <AboutSection {...aboutContent} />
          <FeaturesSection features={features} />
          <PricingSection />
          <DocumentationSection docs={docs} />
          <Footer />
        </div>
      </div>
    </LenisProvider>
  )
}
