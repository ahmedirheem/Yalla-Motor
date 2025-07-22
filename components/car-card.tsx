import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Fuel, Settings, StarIcon } from "lucide-react"
import type { Car } from "@/types/car"

interface CarCardProps {
  car: Car
  isFeatured?: boolean
  priority?: boolean
}

export default function CarCard({ car, priority = false, isFeatured = false }: CarCardProps) {
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
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/used-cars/${car.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={car.pictures[0] || "/placeholder.svg"}
            alt={`${car.make} ${car.model} ${car.year}`}
            fill
            priority={priority}
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {isFeatured && (
            <div className="flex gap-2 items-center absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
              Featured
              <StarIcon width={16} height={16} />
            </div>
          )}
        </div>

        <div className="p-4">
          <header className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">{car.title}</h3>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(car.price, car.currency)}</p>
          </header>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{car.city}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{car.year}</span>
            </div>

            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span>{formatMileage(car.km_driven)} km</span>
            </div>

            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-gray-400" />
              <span>
                {car.fuel_type} • {car.transmission_type}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                {car.make} {car.model}
              </span>
              <span className="text-blue-600 font-medium hover:text-blue-700">View Details →</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
