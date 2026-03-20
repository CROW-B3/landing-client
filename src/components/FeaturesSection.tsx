import { Button, Card, SectionLabel } from '@b3-crow/ui-kit'
import { featuresData } from '@/config/content'

export function FeaturesSection() {
  return (
    <section id="features" className="relative min-h-screen w-full flex items-center justify-center px-8 py-20">
      <div className="max-w-7xl w-full">
        <SectionLabel label="FEATURES" className="mb-16" />

        <div className="max-w-6xl mx-auto">
          <div className="overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-3 responsive-card-grid">
              {featuresData.map((feature, index) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={(
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      width={feature.imageWidth}
                      height={feature.imageHeight}
                      className="h-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-500 ease-out"
                    />
                  )}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === featuresData.length - 1}
                  layout="feature"
                  descriptionClassName="text-[#CDAAFF]"
                  button={(
                    <div className="mt-5">
                      <Button variant="outline">Try Now</Button>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
