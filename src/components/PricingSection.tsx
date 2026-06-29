import { PricingCard, SectionLabel, SegmentedControl } from '@b3-crow/ui-kit'
import { Gauge, Layers, Package } from 'lucide-preact'
import { useState } from 'preact/hooks'
import { pricingData } from '@/config/pricing'

type BillingPeriod = 'monthly' | 'yearly'

// Mirrors the extras in the auth onboarding workflow (auth-client
// `src/app/choose-modules/page.tsx`): auto-scale overage billing, usage packs,
// and mix & match of up to 3 modules.
const addOns = [
  {
    icon: <Gauge className="h-5 w-5 text-purple-300" />,
    title: 'Auto-scale usage',
    description: 'Exceed your included usage and the overflow is billed automatically — no hard caps, no downtime.',
  },
  {
    icon: <Package className="h-5 w-5 text-purple-300" />,
    title: 'Usage packs',
    description: 'Top up interactions and patterns with add-on packs on any module as you grow.',
  },
  {
    icon: <Layers className="h-5 w-5 text-purple-300" />,
    title: 'Mix & match modules',
    description: 'Combine up to 3 modules in one workspace. Add or remove them anytime from Settings.',
  },
]

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')

  const currentPricing = pricingData[billingPeriod]
  const isYearly = billingPeriod === 'yearly'

  return (
    <section id="pricing" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl w-full">

        <SectionLabel label="PLANS" className="mb-4 sm:mb-5 md:mb-6 mt-6 sm:mt-8 md:mt-10" />
        <div className="max-w-5xl mx-auto">

          <p className="max-w-2xl text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 animate-slide-up-fade">
            Mix &amp; match up to 3 modules —
            {' '}
            <span className="text-gray-200 font-medium">$60 per module / month</span>
            , or
            {' '}
            <span className="text-gray-200 font-medium">$50 billed annually</span>
            . Every module includes 1M interactions
            and 1M patterns each month.
          </p>

          <div className="flex items-center justify-end md:justify-end gap-3 mb-6 sm:mb-8 animate-slide-up-fade">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <SegmentedControl
                options={[
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
                value={billingPeriod}
                onChange={value => setBillingPeriod(value as BillingPeriod)}
                size="md"
              />
              {isYearly && (
                <span className="text-[10px] font-medium bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full whitespace-nowrap animate-scale-pulse">
                  Save 17%
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentPricing.map(pricing => (
              <PricingCard
                key={pricing.title}
                {...pricing}
                period="mo"
              />
            ))}
          </div>

          {isYearly && (
            <p className="mt-3 text-xs text-gray-500 text-right">Per-module price shown monthly, billed annually.</p>
          )}

          <div className="mt-10 sm:mt-12">
            <SectionLabel label="ADD-ONS & EXTRAS" className="mb-4 sm:mb-5" />
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
              {addOns.map(addOn => (
                <div
                  key={addOn.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-purple-500/10 mb-4">
                    {addOn.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-100 mb-1.5">{addOn.title}</h3>
                  <p className="text-sm text-gray-400">{addOn.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
