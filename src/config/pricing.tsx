import type { PricingCardProps } from '@b3-crow/ui-kit'
import { Brain, CircleCheck, Globe, MessageSquare, Pointer, Video } from 'lucide-preact'

// Pricing mirrors the auth onboarding workflow (auth-client `src/config/plans.tsx`
// + `src/lib/pricing.ts`): a flat price per module, mix & match up to 3 modules,
// CCTV is the recommended module, and every module includes 1M interactions and
// 1M patterns per month. Monthly = $60/module, Annual = $50/module (billed annually).
const PRICE_PER_MODULE_MONTHLY = 60
const PRICE_PER_MODULE_ANNUAL = 50

const includedUsage = [
  { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
  { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
]

type ModuleCard = Omit<PricingCardProps, 'period' | 'price'>

// Order matches the auth workflow (Web, CCTV, Social) so the recommended CCTV
// module sits in the centre column.
const modules: ModuleCard[] = [
  {
    icon: <Globe className="h-6 w-6 text-gray-300" />,
    category: 'DIGITAL',
    title: 'Web',
    description: 'Digital journey + interaction capture.',
    infoItems: includedUsage,
    features: [
      { label: 'SDK tracking', included: true },
      { label: 'Funnels & drop-off', included: true },
      { label: 'Session evidence', included: true },
      { label: 'Event API', included: true },
    ],
    accentColor: '#8B5CF6',
    checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#8B5CF6' }} />,
  },
  {
    icon: <Video className="h-6 w-6 text-purple-300" />,
    category: 'OBSERVATION',
    title: 'CCTV',
    description: 'Physical behavior + camera signals.',
    infoItems: includedUsage,
    features: [
      { label: 'Sites & camera groups', included: true },
      { label: 'Agent ingest', included: true },
      { label: 'Footfall & queues', included: true },
      { label: 'Heatmaps', included: true },
    ],
    isPopular: true,
    popularBadgeText: 'MOST POPULAR',
    accentColor: '#A855F7',
    checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#A855F7' }} />,
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-gray-300" />,
    category: 'SENTIMENT',
    title: 'Social',
    description: 'Mentions, sentiment, and trend signals.',
    infoItems: includedUsage,
    features: [
      { label: 'Keyword tracking', included: true },
      { label: 'Sentiment & spikes', included: true },
      { label: 'Source selection', included: true },
      { label: 'Regional filters', included: true },
    ],
    accentColor: '#8B5CF6',
    checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#8B5CF6' }} />,
  },
]

function withPrice(price: number): Omit<PricingCardProps, 'period'>[] {
  return modules.map(module => ({ ...module, price }))
}

export const pricingData: {
  monthly: Omit<PricingCardProps, 'period'>[]
  yearly: Omit<PricingCardProps, 'period'>[]
} = {
  monthly: withPrice(PRICE_PER_MODULE_MONTHLY),
  yearly: withPrice(PRICE_PER_MODULE_ANNUAL),
}
