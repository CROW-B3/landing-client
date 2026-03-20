'use client'

import { LenisProvider } from './LenisProvider'
import { QueryProvider } from './QueryProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <LenisProvider>{children}</LenisProvider>
    </QueryProvider>
  )
}
