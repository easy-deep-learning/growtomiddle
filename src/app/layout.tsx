import '@ant-design/v5-patch-for-react-19';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

import ApolloWrapper from '@/apollo/client-side-components';

import { NextAuthProvider } from './providers';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'gymnasia',
  description: 'gymnasia — education world for all',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ApolloWrapper>
            <AntdRegistry>{children}</AntdRegistry>
          </ApolloWrapper>
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
