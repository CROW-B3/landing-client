import type { AboutSectionProps } from '@/types'

export const aboutContent: AboutSectionProps = {
  label: 'ABOUT',
  title: 'CROW',
  subtitle: '(Cognitive Reasoning Observation Watcher)',
  description: 'Unifies website analytics, CCTV insights, and social feedback into one model - showing real shopper behaviour across every channel.',
}

export const featuresData = [
  {
    title: 'Interaction',
    description: 'Web, in-store (CCTV), and social signals merged into one clean, queryable interaction model.',
    imageSrc: '/interaction.webp',
    imageAlt: 'Interaction',
    imageWidth: 200,
    imageHeight: 100,
  },
  {
    title: 'API',
    description: 'Endpoints for interactions and summaries, ready to plug into any dashboard or automation.',
    imageSrc: '/api.webp',
    imageAlt: 'API',
    imageWidth: 200,
    imageHeight: 60,
  },
  {
    title: 'Chat',
    description: 'An AI analyst that explains behaviour, spots spikes, compares stores, and answers product questions clearly.',
    imageSrc: '/chat.webp',
    imageAlt: 'Chat',
    imageWidth: 200,
    imageHeight: 100,
  },
]

export const docsData = [
  {
    title: 'Developer Docs',
    description: 'Get start in minutes with our integration guide and example calls.',
    buttonText: 'View Guide',
    iconName: 'TbLockCode' as const,
  },
  {
    title: 'API References',
    description: 'Comprehensive list of endpoints, parameters, and responses.',
    buttonText: 'Explore API',
    iconName: 'MdApi' as const,
  },
  {
    title: 'Auth & Security',
    description: 'How to securely authenticate with our system and manage access.',
    buttonText: 'Auth Docs',
    iconName: 'MdOutlineDeveloperBoard' as const,
  },
  {
    title: 'SDK & Libraries',
    description: 'Installable package and helper libraries for Node.js, Python, etc.',
    buttonText: 'View SDKs',
    iconName: 'RiCodeBoxLine' as const,
  },
]
