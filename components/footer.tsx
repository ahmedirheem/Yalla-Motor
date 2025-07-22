import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href='/' className='flex mb-6'>
              <Image
                src="/images/logo-white.png"
                alt="YallaMotor"
                width={160}
                height={100}
                className="object-cover"
              />
            </Link>
            <p className="text-gray-400">Your trusted partner for buying and selling used cars in UAE.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/used-cars" className="hover:text-white">
                  Used Cars
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Popular Brands</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/used-cars/toyota" className="hover:text-white">
                  Toyota
                </Link>
              </li>
              <li>
                <Link href="/used-cars/bmw" className="hover:text-white">
                  BMW
                </Link>
              </li>
              <li>
                <Link href="/used-cars/mercedes" className="hover:text-white">
                  Mercedes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@yallamotor.com</li>
              <li>Phone: +971 4 123 4567</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 YallaMotor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer