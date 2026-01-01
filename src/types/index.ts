export interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
}

export interface DocItem {
  title: string
  description: string
  buttonText: string
  icon: React.ReactNode
}

export interface AboutSectionProps {
  label?: string
  title?: string
  subtitle?: string
  description?: string
}
