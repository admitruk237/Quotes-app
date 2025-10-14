import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/sections'
import { ClientLayout } from './ClientLayout'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Quotes App',
  description: 'Discover inspiring quotes from famous authors',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
        suppressHydrationWarning
      >
        <ClientLayout>
          <Header />
          <main className="@container max-w-7xl py-7 mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  )
}
