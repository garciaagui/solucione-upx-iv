import { AppShell } from '@/components/app-shell'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/auth-context'
import { QueryProvider } from '@/contexts/query-provider'
import ThemeProvider from '@/contexts/theme-provider'
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppShell>{children}</AppShell>
            </ThemeProvider>
            <Toaster duration={3000} expand={true} />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
