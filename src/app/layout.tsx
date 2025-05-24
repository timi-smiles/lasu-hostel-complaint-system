import type React from "react"
// This file is used to define the root layout of the application.
import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Providers } from "@/components/providers"

// Initialize font
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>

      </body>
    </html>
  )
}
