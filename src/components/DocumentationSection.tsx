import { Button, Card, SectionLabel } from '@b3-crow/ui-kit'
import { MdApi, MdOutlineDeveloperBoard } from 'react-icons/md'
import { RiCodeBoxLine } from 'react-icons/ri'
import { TbLockCode } from 'react-icons/tb'
import { docsData } from '@/config/content'

const iconMap = {
  TbLockCode,
  MdApi,
  MdOutlineDeveloperBoard,
  RiCodeBoxLine,
}

export function DocumentationSection() {
  return (
    <section id="documentation" className="relative min-h-screen w-full flex items-center justify-center px-8 py-20">
      <div className="max-w-7xl w-full relative z-10">
        <SectionLabel label="DOCUMENTATIONS" className="mb-16" />

        <div className="max-w-6xl mx-auto">
          <div className="overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 responsive-card-grid">
              {docsData.map((doc, index) => {
                const IconComponent = iconMap[doc.iconName]
                return (
                  <Card
                    key={doc.title}
                    title={doc.title}
                    description={doc.description}
                    icon={<IconComponent className="w-12 h-12" />}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === docsData.length - 1}
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
