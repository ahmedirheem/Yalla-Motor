import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"

import CarImageGallery from "@/components/car-image-gallery"
import WhatsAppButton from "@/components/whatsapp-button"
import carsInfo from '../../../public/data/data.json'
import type { Car } from "@/types/car"

import { MapPin, Calendar, Fuel, Settings, Palette, CarIcon, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ReactElement } from "react"

type CarsData = {
  data: {
    used_cars: Car[],
    featured_used_cars: Car[]
  }
}

const cars = carsInfo as CarsData

async function getCarById(id: string): Promise<Car | null> {
  const allCars: Car[] = [
  ...cars.data.used_cars,
  ...cars.data.featured_used_cars,
]
  return allCars.find((car) => car.id.toString() === id.toString()) || null
}

export async function generateMetadata({ params }: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const car = await getCarById(id)

  if (!car) {
    return {
      title: "Car Not Found | YallaMotor",
      description: "The requested car listing could not be found.",
    }
  }

  const title = `${car.make} ${car.model} ${car.year} for Sale in ${car.city} | YallaMotor`
  const description = `${car.make} ${car.model} ${car.year} for sale in ${car.city}. Price: ${new Intl.NumberFormat(
    "en-AE",
    {
      style: "currency",
      currency: car.currency,
      minimumFractionDigits: 0,
    },
  ).format(car.price)}. Mileage: ${new Intl.NumberFormat("en-US").format(car.km_driven)} km.`

  return {
    title,
    description,
    keywords: `${car.make} ${car.model}, used car ${car.city}, ${car.year} ${car.make}, cars for sale UAE`,
    openGraph: {
      title,
      description,
      url: `https://uae.yallamotor.com/used-cars/${car.id}`,
      siteName: "YallaMotor",
      images: [
        {
          url: car.pictures[0],
          width: 800,
          height: 600,
          alt: `${car.make} ${car.model} ${car.year}`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.pictures[0]],
    },
    alternates: {
      canonical: `https://uae.yallamotor.com/used-cars/${car.id}`,
    },
  }
}

export default async function CarDetailPage({ params }: {
  params: Promise<{ id: string }>
}): Promise<ReactElement> {
  const { id } = await params

  const car = await getCarById(id);
  if (!car) {
    notFound()
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        {/* Home Link */}
        <nav className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home page
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <section className="mb-8">
              <CarImageGallery images={car.pictures} carTitle={`${car.make} ${car.model} ${car.year}`} />
            </section>

            {/* Car Details */}
            <article className="bg-white rounded-lg shadow-md p-6 mb-8">
              <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {car.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {car.year}
                  </span>
                </div>
              </header>

              {/* Specifications */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CarIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Make & Model</span>
                    </div>
                    <p className="text-gray-900">
                      {car.make} {car.model}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Mileage</span>
                    </div>
                    <p className="text-gray-900">{formatMileage(car.km_driven)} km</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Fuel className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Fuel Type</span>
                    </div>
                    <p className="text-gray-900">{car.fuel_type}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">Color</span>
                    </div>
                    <p className="text-gray-900">{car.exterior_color}</p>
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="car-description space-y-10 text-gray-800" dangerouslySetInnerHTML={{ __html: car.description }} />
              </section>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">{car.title}</p>
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-600">Asking Price</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">{formatPrice(car.price, car.currency)}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Seller</h3>

                {car.whatsapp_number && (
                  <WhatsAppButton
                    phoneNumber={car.whatsapp_number}
                    message={`Hi, I'm interested in your ${car.make} ${car.model} ${car.year} listed for ${formatPrice(car.price, car.currency)}`}
                  />
                )}

                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800">
                  Call Seller
                </Button>

                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800">
                  Send Email
                </Button>
              </div>

              {/* Quick Facts */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Facts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Body Style:</span>
                    <span className="text-gray-900">{car.body_style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span className="text-gray-900">{car.transmission_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span className="text-gray-900">{car.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{car.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </main>
  )
}
