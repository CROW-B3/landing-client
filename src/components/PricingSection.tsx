'use client'

import { PricingCard, SectionLabel, SegmentedControl } from '@b3-crow/ui-kit'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { pricingData } from '@/config/pricing'

type BillingPeriod = 'monthly' | 'yearly'

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')

  const currentPricing = pricingData[billingPeriod]
  const period = billingPeriod === 'monthly' ? 'mo' : 'yr'

  return (
    <section
      id="pricing"
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-7xl w-full">
        <SectionLabel
          label="PLANS"
          className="mb-4 sm:mb-5 md:mb-6 mt-6 sm:mt-8 md:mt-10"
        />
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex items-center justify-end md:justify-end gap-3 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
              {billingPeriod === 'yearly' && (
                <span className="text-[10px] font-medium bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full whitespace-nowrap animate-scale-pulse">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentPricing.map((pricing, index) => (
              <PricingCard key={index} {...pricing} period={period} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
