import React from 'react'
import { NextAuthProvider } from './providers'

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
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
