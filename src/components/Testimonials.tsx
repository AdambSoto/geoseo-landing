'use client'

import React from 'react'
import Image from 'next/image'

const companies = [
  { name: 'TechCorp', logo: '/company1.svg' },
  { name: 'InnovateX', logo: '/company2.svg' },
  { name: 'FutureTech', logo: '/company3.svg' },
  { name: 'SmartSolutions', logo: '/company4.svg' },
]

export default function Testimonials() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Who's already excited
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-lg font-medium text-gray-900">{company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 