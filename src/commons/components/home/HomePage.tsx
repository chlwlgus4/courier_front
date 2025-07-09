'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import TrackingSection from './TrackingSection'
import CountrySelect from '@/commons/components/home/CountrySelect'
import DeliveryOptionButton from '@/commons/components/home/DeliveryOptionButton'
import ResultCard from '@/commons/components/home/ResultCard'

const HomePage = () => {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  const router = useRouter()

  const handleNext = () => {
    if (!selectedCountry || !selectedType) {
      alert('배송 국가와 방식을 선택해주세요.')
      return
    }

    router.push(
      `/apply?country=${encodeURIComponent(selectedCountry)}&type=${encodeURIComponent(selectedType)}`,
    )
  }
  return (
    <div className="flex-1 p-4 space-y-6">
      <TrackingSection />

      <div className="space-y-4 p-1">
        <label className="block text-sm font-semibold text-gray-700">
          배송 국가
        </label>
        <CountrySelect value={selectedCountry} onChange={setSelectedCountry} />
      </div>

      <div className="space-y-4 p-1">
        <label className="block text-sm font-semibold text-gray-700">
          배송 방식
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          <DeliveryOptionButton
            title="빠른배송"
            image={'/images/rocket.png'}
            selected={selectedType === '빠른배송'}
            onClick={() => setSelectedType('빠른배송')}
            width={100}
            height={100}
          />
          <DeliveryOptionButton
            title="느린배송"
            image={'/images/turtle.png'}
            selected={selectedType === '느린배송'}
            onClick={() => setSelectedType('느린배송')}
            width={100}
            height={100}
          />
        </div>
      </div>

      <ResultCard country={selectedCountry} type={selectedType} />

      {selectedCountry && selectedType && (
        <div className="pt-4">
          <button
            className="w-full bg-blue-400 text-white py-3 rounded-xl hover:bg-blue-500 font-semibold"
            onClick={handleNext}
          >
            화물 정보 입력
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
