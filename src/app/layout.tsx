import React from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import ApolloWrapper from '@/apollo/client-side-components'

import { NextAuthProvider } from './providers'

import '@/styles/global.css'

export const metadata: Metadata = {
  title: 'gymnasia',
  description: 'gymnasia — education world for all',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
