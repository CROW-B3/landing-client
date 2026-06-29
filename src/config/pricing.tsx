import type { PricingCardProps } from '@b3-crow/ui-kit'
import { Brain, CircleCheck, Globe, MessageSquare, Pointer, Video } from 'lucide-preact'

/**
 * Mirrors the auth onboarding workflow — the pricing source of truth at
 * `auth-client/src/config/plans.tsx` + `auth-client/src/lib/pricing.ts`:
 *   - flat $60/module monthly, $50/module billed annually (per-module /mo figure)
 *   - CCTV is the recommended (MOST POPULAR) module
 *   - card order Web · CCTV · Social so the recommended CCTV sits centre
 *   - each module includes 1M interactions + 1M patterns / month
 * Keep this in sync with plans.tsx; do not let the marketing prices drift.
 */

const INCLUDED: NonNullable<PricingCardProps['infoItems']> = [
  { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
  { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
]

function plans(price: number): Omit<PricingCardProps, 'period'>[] {
  return [
    {
      icon: <Globe className="h-6 w-6 text-gray-300" />,
      category: 'DIGITAL',
      title: 'Web',
      description: 'Digital journey + interaction capture.',
      price,
      infoItems: INCLUDED,
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
      price,
      infoItems: INCLUDED,
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
      price,
      infoItems: INCLUDED,
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
}

export const pricingData: {
  monthly: Omit<PricingCardProps, 'period'>[]
  yearly: Omit<PricingCardProps, 'period'>[]
} = {
  monthly: plans(60),
  yearly: plans(50),
}
