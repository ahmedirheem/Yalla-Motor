import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "YallaMotor - Used Cars for Sale in UAE",
    template: "%s | YallaMotor",
  },
  description:
    "Find the best used cars for sale in UAE. Browse through thousands of verified pre-owned vehicles from trusted sellers across Dubai, Abu Dhabi, and more.",
  keywords: "used cars UAE, cars for sale Dubai, pre-owned vehicles, second hand cars, YallaMotor",
  authors: [{ name: "YallaMotor" }],
  creator: "YallaMotor",
  publisher: "YallaMotor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://uae.yallamotor.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uae.yallamotor.com",
    siteName: "YallaMotor",
    title: "YallaMotor - Used Cars for Sale in UAE",
    description: "Find the best used cars for sale in UAE. Browse through thousands of verified pre-owned vehicles.",
    images: [
      {
        url: "/images/car.webp",
        width: 1200,
        height: 630,
        alt: "YallaMotor - Used Cars for Sale in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YallaMotor - Used Cars for Sale in UAE",
    description: "Find the best used cars for sale in UAE. Browse through thousands of verified pre-owned vehicles.",
    images: ["/images/car.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
