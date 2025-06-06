'use client'

import React, { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  icon: ReactNode
}

const ServiceCard = ({ title, icon }: ServiceCardProps) => {
  return (
    <div className="bg-mint rounded-2xl p-6 flex flex-col items-center shadow-md hover:bg-sky-200 transition duration-200">
      <div className="text-4xl mb-4 text-toss-500">{icon}</div>
      <p className="text-gray-800 font-medium">{title}</p>
    </div>
  )
}

export default ServiceCard
