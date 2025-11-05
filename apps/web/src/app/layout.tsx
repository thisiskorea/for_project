import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'AI Research Platform',
    template: '%s | AI Research Platform',
  },
  description:
    'A comprehensive platform for AI researchers - paper management, project collaboration, experiment tracking, and cloud computing.',
  keywords: [
    'AI',
    'Machine Learning',
    'Research',
    'Papers',
    'Collaboration',
    'Experiments',
    'GPU',
  ],
  authors: [{ name: 'AI Research Platform Team' }],
  creator: 'AI Research Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-research-platform.com',
    title: 'AI Research Platform',
    description:
      'A comprehensive platform for AI researchers - paper management, project collaboration, experiment tracking, and cloud computing.',
    siteName: 'AI Research Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Research Platform',
    description:
      'A comprehensive platform for AI researchers - paper management, project collaboration, experiment tracking, and cloud computing.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
