import type { DocItem } from '@/types'
import { Button, Card, SectionLabel } from '@b3-crow/ui-kit'

interface DocumentationSectionProps {
  docs: DocItem[]
}

export default function DocumentationSection({
  docs,
}: DocumentationSectionProps) {
  return (
    <section
      id="documentation"
      className="relative min-h-screen w-full flex items-center justify-center px-8 py-20"
    >
      <div className="max-w-7xl w-full relative z-10">
        <SectionLabel label="DOCUMENTATIONS" className="mb-16" />

        <div className="max-w-6xl mx-auto">
          <div className="overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 responsive-card-grid">
              {docs.map((doc, index) => {
                return (
                  <Card
                    key={doc.title}
                    title={doc.title}
                    description={doc.description}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === docs.length - 1}
                    layout="documentation"
                    contentAlign="center"
                    descriptionClassName="text-white/60"
                    button={<Button variant="outline">{doc.buttonText}</Button>}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
