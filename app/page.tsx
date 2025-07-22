'use client';

import type { Metadata } from "next";
import Image from "next/image";

import type { Car } from "@/types/car"
import CarCard from "@/components/car-card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { getAllCars, getFeaturedCars } from "@/lib/utils";
import { useEffect, useState } from "react";

// theme color #124d99

export const metadata: Metadata = {
  title: "Used Cars for Sale in UAE | YallaMotor",
  description:
    "Find the best used cars for sale in UAE. Browse through our extensive collection of pre-owned vehicles from top brands like Toyota, BMW, Mercedes, and more.",
  keywords: "used cars UAE, cars for sale Dubai, pre-owned vehicles, second hand cars Abu Dhabi",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
  },
  openGraph: {
    title: "Used Cars for Sale in UAE | YallaMotor",
    description:
      "Find the best used cars for sale in UAE. Browse through our extensive collection of pre-owned vehicles.",
    url: "https://uae.yallamotor.com",
    siteName: "YallaMotor",
    images: [
      {
        url: "/images/car.webp",
        width: 1200,
        height: 630,
        alt: "Used Cars for Sale in UAE",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Cars for Sale in UAE | YallaMotor",
    description:
      "Find the best used cars for sale in UAE. Browse through our extensive collection of pre-owned vehicles.",
    images: ["/images/car.webp"],
  },
  alternates: {
    canonical: "https://uae.yallamotor.com",
  },
}

export default function Home() {

  const [cars, setCars] = useState<Car[]>([])
  const [featuredCars, setFeaturedCars] = useState<Car[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/data/data.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        setCars(jsonData.data.used_cars)
        setFeaturedCars(jsonData.data.featured_used_cars)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="w-full">
        <div className="p-4">
          <Image
            src="/images/yalla-motor-banner.png"
            alt="Used Cars Showroom"
            width={10000}
            height={1000}
            priority
            className="rounded-lg shadow-2xl object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Cars Listing Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">

          <header className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Available Used Cars
            </h2>
            <p className="text-gray-600 text-lg">
              Discover quality pre-owned vehicles from trusted sellers across the UAE.
            </p>
            <div className="mt-4 h-1 w-24 bg-primary mx-auto rounded-full" />
          </header>

          {/* Featured Cars */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Featured Cars</h3>
              <Button variant='outline' size="lg" className="text-blue-600 hover:text-blue-800 font-medium text-sm cursor-pointer">
                <Link href='/'>
                  View All →
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? "Loading..." : featuredCars
                .slice(0, 6)
                .map((car) => (
                  <CarCard key={car.id} car={car} isFeatured priority />
                ))}
            </div>
          </div>

          {/* All Cars */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">All Cars</h3>
              <Button variant='outline' size="lg" className="text-blue-600 hover:text-blue-800 font-medium text-sm cursor-pointer">
                <Link href='/'>
                  View All →
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? "Loading..." : cars
                .slice(0, 9)
                .map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
