import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeWrapper from '@/app/components/wrapper/themeWrapper'
import NextAuthProvider from '@/app/components/wrapper/nextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <NextAuthProvider>
              <ThemeWrapper enableSystem={false} attribute='class'>
                  {children}
              </ThemeWrapper>
            </NextAuthProvider>
        </body>
    </html>
  )
}
