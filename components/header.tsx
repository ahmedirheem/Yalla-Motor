import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            <Link href='/'>
              <Image
                src="/images/logo.svg"
                alt="YallaMotor"
                width={180}
                height={100}
                className="object-cover"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/used-cars" className="text-gray-700 hover:text-blue-600 font-medium">
              Used Cars
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium">
              Sell Your Car
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header