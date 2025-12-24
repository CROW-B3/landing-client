'use client'

import { Card, Button, SectionLabel } from '@b3-crow/ui-kit'

export interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
}

export interface FeaturesSectionProps {
  features: FeatureItem[]
}

export function FeaturesSection({ features }: FeaturesSectionProps) {

  return (
    <section id="features" className="relative min-h-screen w-full flex items-center justify-center px-8 py-20">
      <div className="max-w-7xl w-full">
        <SectionLabel label="FEATURES" className="mb-16" />

        <div className="max-w-6xl mx-auto">
          <div className="overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === features.length - 1}
                  layout="feature"
                  descriptionClassName="text-[#CDAAFF]"
                  button={
                    <div className="mt-5">
                      <Button variant="outline">Try Now</Button>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
