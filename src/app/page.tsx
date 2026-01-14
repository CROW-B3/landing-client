'use client'

import type { DocItem, FeatureItem } from '@/types'
import { AnimatedBackground } from '@b3-crow/ui-kit'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { MdApi, MdOutlineDeveloperBoard } from 'react-icons/md'
import { RiCodeBoxLine } from 'react-icons/ri'
import { TbLockCode } from 'react-icons/tb'
import { HeroSection } from '@/components/HeroSection'
import { Navigation } from '@/components/Navigation'

import { aboutContent, docsData, featuresData } from '@/config/content'

const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <p>Loading...</p>,
})
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), {
  loading: () => <p>Loading...</p>,
})
const PricingSection = dynamic(() => import('@/components/PricingSection'), {
  loading: () => <p>Loading...</p>,
})
const DocumentationSection = dynamic(
  () => import('@/components/DocumentationSection'),
  {
    loading: () => <p>Loading...</p>,
  },
)
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const iconMap = {
  TbLockCode,
  MdApi,
  MdOutlineDeveloperBoard,
  RiCodeBoxLine,
}

export default function HomePage() {
  const features: FeatureItem[] = featuresData.map(feature => ({
    ...feature,
    icon: (
      <Image
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
    <div
      onDragStart={e => e.preventDefault()}
      className="overflow-x-hidden relative"
    >
      <AnimatedBackground
        variant="fullscreen"
        enableVerticalFade={true}
        fadeIntensity={0.9}
      />
      \
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
  )
}
