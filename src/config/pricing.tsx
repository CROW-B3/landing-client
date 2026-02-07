import type { PricingCardProps } from '@b3-crow/ui-kit'
import { Brain, CircleCheck, Globe, MessageSquare, Pointer, Video } from 'lucide-preact'

export const pricingData: {
  monthly: Omit<PricingCardProps, 'period'>[]
  yearly: Omit<PricingCardProps, 'period'>[]
} = {
  monthly: [
    {
      icon: <Video className="h-6 w-6 text-gray-300" />,
      category: 'OBSERVATION',
      title: 'CCTV',
      description: 'Physical space analytics and flow tracking.',
      price: 69,
      infoItems: [
        { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
        { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
      ],
      features: [
        { label: '5 Camera Streams', included: true },
        { label: 'Heatmap Generation', included: true },
        { label: 'Footfall Analytics', included: true },
        { label: '30-Day Retention', included: true },
        { label: 'API Integration', included: true },
      ],
      accentColor: '#8B5CF6',
      checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#8B5CF6' }} />,
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-300" />,
      category: 'DIGITAL',
      title: 'Web',
      description: 'Full user journey and behavior modeling.',
      price: 69,
      infoItems: [
        { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
        { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
      ],
      features: [
        { label: 'Unlimited Sessions', included: true },
        { label: 'Rage Click Detection', included: true },
        { label: 'Funnel Optimization AI', included: true },
        { label: 'Real-time User Replay', included: true },
        { label: 'Advanced API Access', included: true },
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
      description: 'Brand sentiment and feedback aggregation.',
      price: 69,
      infoItems: [
        { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
        { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
      ],
      features: [
        { label: '5 Social Channels', included: true },
        { label: 'Keyword Tracking', included: true },
        { label: 'Sentiment AI Analysis', included: true },
        { label: 'Weekly Digests', included: true },
        { label: 'Competitor Monitoring', included: true },
      ],
      accentColor: '#8B5CF6',
      checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#8B5CF6' }} />,
    },
  ],
  yearly: [
    {
      icon: <Video className="h-6 w-6 text-gray-300" />,
      category: 'OBSERVATION',
      title: 'CCTV',
      description: 'Physical space analytics and flow tracking.',
      price: 59,
      infoItems: [
        { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
        { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
      ],
      features: [
        { label: '5 Camera Streams', included: true },
        { label: 'Heatmap Generation', included: true },
        { label: 'Footfall Analytics', included: true },
        { label: '30-Day Retention', included: true },
        { label: 'API Integration', included: true },
      ],
      accentColor: '#8B5CF6',
      checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#8B5CF6' }} />,
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-300" />,
      category: 'DIGITAL',
      title: 'Web',
      description: 'Full user journey and behavior modeling.',
      price: 59,
      infoItems: [
        { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
        { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
      ],
      features: [
        { label: 'Unlimited Sessions', included: true },
        { label: 'Rage Click Detection', included: true },
        { label: 'Funnel Optimization AI', included: true },
        { label: 'Real-time User Replay', included: true },
        { label: 'Advanced API Access', included: true },
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
      description: 'Brand sentiment and feedback aggregation.',
      price: 59,
      infoItems: [
        { icon: <Pointer className="h-4 w-4" />, text: '1,000,000 interactions / month' },
        { icon: <Brain className="h-4 w-4" />, text: '1,000,000 patterns / month' },
      ],
      features: [
        { label: '5 Social Channels', included: true },
        { label: 'Keyword Tracking', included: true },
        { label: 'Sentiment AI Analysis', included: true },
        { label: 'Weekly Digests', included: true },
        { label: 'Competitor Monitoring', included: true },
      ],
      accentColor: '#8B5CF6',
      checkIcon: <CircleCheck className="h-4 w-4" style={{ color: '#8B5CF6' }} />,
    },
  ],
}
