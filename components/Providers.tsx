'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider, useTheme } from 'next-themes'
import SiteAccessGate from './SiteAccessGate'

function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme() 

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
      }}
      key={resolvedTheme}
    >
      {children}
    </ClerkProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkThemeProvider>
        <SiteAccessGate>{children}</SiteAccessGate>
      </ClerkThemeProvider>
    </ThemeProvider>
  )
}