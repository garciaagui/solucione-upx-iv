import AppSidebar from '@/components/app-sidebar'
import Header from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/contexts/query-provider'
import SessionProvider from '@/contexts/session-provider'
import ThemeProvider from '@/contexts/theme-provider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
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
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset>
                  <Header />
                  <main className="w-full p-4">{children}</main>
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </QueryProvider>
          <Toaster duration={3000} expand={true} />
        </SessionProvider>
      </body>
    </html>
  )
}
