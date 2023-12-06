import React from 'react'
import ApolloWrapper from '@/apollo/client-side-components'

import { NextAuthProvider } from './providers'

import '@/styles/global.css'

export const metadata = {
  title: 'gymnasia',
  description: 'gymnasia — education world for all',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <NextAuthProvider>
      <ApolloWrapper>
        {children}
      </ApolloWrapper>
    </NextAuthProvider>
    </body>
    </html>
  )
}
