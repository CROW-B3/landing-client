'use client'

import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { FeaturesSection, type FeatureItem } from '@/components/FeaturesSection'
import { DocumentationSection, type DocItem } from '@/components/DocumentationSection'
import { Footer } from '@/components/Footer'
import Image from 'next/image'
import { TbLockCode } from 'react-icons/tb'
import { MdApi, MdOutlineDeveloperBoard } from 'react-icons/md'
import { RiCodeBoxLine } from 'react-icons/ri'

export default function HomePage() {
  const features: FeatureItem[] = [
    {
      title: 'Interaction',
      description: 'Web, in-store (CCTV), and social signals merged into one clean, queryable interaction model.',
      icon: (
        <Image
          src="/interaction.webp"
          alt="Interaction"
          width={200}
          height={100}
          className="h-auto object-contain opacity-30"
        />
      ),
    },
    {
      title: 'API',
      description: 'Endpoints for interactions and summaries, ready to plug into any dashboard or automation.',
      icon: (
        <Image
          src="/api.webp"
          alt="API"
          width={200}
          height={60}
          className="h-auto object-contain opacity-30"
        />
      ),
    },
    {
      title: 'Chat',
      description: 'An AI analyst that explains behaviour, spots spikes, compares stores, and answers product questions clearly.',
      icon: (
        <Image
          src="/chat.webp"
          alt="Chat"
          width={200}
          height={100}
          className="h-auto object-contain opacity-30"
        />
      ),
    },
  ]

  const docs: DocItem[] = [
    {
      title: 'Developer Docs',
      description: 'Get start in minutes with our integration guide and example calls.',
      buttonText: 'View Guide',
      icon: <TbLockCode className="w-12 h-12" />,
    },
    {
      title: 'API References',
      description: 'Comprehensive list of endpoints, parameters, and responses.',
      buttonText: 'Explore API',
      icon: <MdApi className="w-12 h-12" />,
    },
    {
      title: 'Auth & Security',
      description: 'How to securely authenticate with our system and manage access.',
      buttonText: 'Auth Docs',
      icon: <MdOutlineDeveloperBoard className="w-12 h-12" />,
    },
    {
      title: 'SDK & Libraries',
      description: 'Installable package and helper libraries for Node.js, Python, etc.',
      buttonText: 'View SDKs',
      icon: <RiCodeBoxLine className="w-12 h-12" />,
    },
  ]

  return (
    <div onDragStart={(e) => e.preventDefault()}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection features={features} />
      <DocumentationSection docs={docs} />
      <Footer />
    </div>
  )
}