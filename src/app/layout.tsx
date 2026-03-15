import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import { Providers } from '@/providers/Providers'
import './globals.css'

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'CROW',
  description:
    'We are thrilled to unveil CROW, our most advanced model yet, blending superior reasoning with extensive pretraining knowledge.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp"></link>
      </head>
      <body className={`${sora.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
