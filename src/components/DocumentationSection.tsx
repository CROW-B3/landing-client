'use client'

import { Card, Button, SectionLabel } from '@b3-crow/ui-kit'
import Particles from './Particles'
import { TbLockCode } from "react-icons/tb"
import { MdApi } from "react-icons/md"
import { MdOutlineDeveloperBoard } from "react-icons/md"
import { RiCodeBoxLine } from "react-icons/ri"

export function DocumentationSection() {
  const docs = [
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
    <section id="documentation" className="relative min-h-screen w-full flex items-center justify-center px-8 py-20 bg-black">
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#292B5F', '#292B5F']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <SectionLabel label="DOCUMENTATIONS" className="mb-16" />

        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {docs.map((doc, index) => (
                <Card
                  key={doc.title}
                  title={doc.title}
                  description={doc.description}
                  icon={doc.icon}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === docs.length - 1}
                  layout="documentation"
                  contentAlign="center"
                  descriptionClassName="text-white/60"
                  button={<Button variant="outline">{doc.buttonText}</Button>}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
