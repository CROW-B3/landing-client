'use client'

import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { PricingSection } from '@/components/PricingSection'
import { DocumentationSection } from '@/components/DocumentationSection'
import { Footer } from '@/components/Footer'
import { aboutContent, featuresData, docsData } from '@/config/content'
import { AnimatedBackground } from '@b3-crow/ui-kit'
import type { FeatureItem, DocItem } from '@/types'
import Image from 'next/image'
import { TbLockCode } from 'react-icons/tb'
import { MdApi, MdOutlineDeveloperBoard } from 'react-icons/md'
import { RiCodeBoxLine } from 'react-icons/ri'

const iconMap = {
  TbLockCode: TbLockCode,
  MdApi: MdApi,
  MdOutlineDeveloperBoard: MdOutlineDeveloperBoard,
  RiCodeBoxLine: RiCodeBoxLine,
}

export default function HomePage() {
  const features: FeatureItem[] = featuresData.map((feature) => ({
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
    <div onDragStart={(e) => e.preventDefault()} className="overflow-x-hidden relative">
      <AnimatedBackground variant="fullscreen" enableVerticalFade={true} fadeIntensity={0.9} />\
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
