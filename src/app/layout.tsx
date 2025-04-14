import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/contexts/query-provider'
import SessionProvider from '@/contexts/session-provider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Solucione',
  description: 'Solucione',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster toastOptions={{ duration: 3000 }} />
        </SessionProvider>
      </body>
    </html>
  )
}
