import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Footer, Navbar } from "@/components"
import { cn } from "@/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Searchpets",
    default: "Home | Searchpets"
  }
}

export const viewport: Viewport = {
  initialScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-x-hidden text-sm")}>
        <div className="contents">
          <Navbar />
          <div className="min-h-[calc(100dvh-4rem)] mx-auto max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl px-7">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
