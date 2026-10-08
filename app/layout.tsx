import { Geist, Geist_Mono, Instrument_Sans, Newsreader } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Cardboard",
  description: "Cardboard - AI Video Creation Workspace",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/cardboard-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        instrumentSans.variable,
        newsreader.variable
      )}
    >
      <body className="min-h-screen bg-[#0C0C0E] text-[#EDEDED] antialiased selection:bg-neutral-700 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
