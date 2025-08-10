'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import TrackingSection from './TrackingSection'
import CountrySelect from '@/commons/components/home/CountrySelect'
import DeliveryOptionButton from '@/commons/components/home/DeliveryOptionButton'
import ResultCard, { ResultCardRef } from '@/commons/components/home/ResultCard'
import { ItemType } from '@/commons/types'
import countryStore from '@/store/countryStore'
import { deliveryStore } from '@/store/deliveryStore'

const HomePage = () => {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [items, setItems] = useState<ItemType[]>([
    { name: '', weight: '', width: '', height: '', size: '' },
  ])

  const {
    setDeliveryFee,
    setItems: setStoreItems,
    setCountry: setStoreCountry,
  } = deliveryStore()

  const { getCountry } = countryStore()

  const router = useRouter()
  const resultCardRef = useRef<ResultCardRef>(null)

  const handleNext = () => {
    if (!selectedCountry || !selectedType) {
      alert('배송 국가와 방식을 선택해주세요.')
      return
    }

    if (!resultCardRef.current) return

    const fee = resultCardRef.current.getDeliveryFee()
    setDeliveryFee(fee)
    setStoreItems(items)
    const country = getCountry(selectedCountry)
    if (country) setStoreCountry(country)

    router.push('/quote')
  }

  const addItem = () => {
    setItems([
      ...items,
      { name: '', weight: '', width: '', height: '', size: '' },
    ])
  }

  const handleItemChange = (
    index: number,
    field: keyof ItemType,
    value: string,
  ) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
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
          물품 정보
        </label>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative p-4 border border-gray-300 rounded-lg"
          >
            {items.length > 1 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-300 hover:text-red-500 focus:outline-none"
                onClick={() => removeItem(idx)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1 sm:col-span-4 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  물품명
                </label>
                <input
                  type="text"
                  placeholder="예: 티셔츠"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(idx, 'name', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  무게 (kg)
                </label>
                <input
                  type="number"
                  placeholder="예: 1.5"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={item.weight}
                  onChange={(e) =>
                    handleItemChange(idx, 'weight', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  가로 (w)
                </label>
                <input
                  type="number"
                  placeholder="예: 1.5"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={item.width}
                  onChange={(e) =>
                    handleItemChange(idx, 'width', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  세로 (l)
                </label>
                <input
                  type="number"
                  placeholder="예: 1.5"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={item.size}
                  onChange={(e) =>
                    handleItemChange(idx, 'size', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  높이 (h)
                </label>
                <input
                  type="number"
                  placeholder="예: 1.5"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={item.height}
                  onChange={(e) =>
                    handleItemChange(idx, 'height', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-2 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        onClick={addItem}
      >
        <span className="mr-2 text-xl">➕</span>
        <span className="font-medium">물품 추가</span>
      </button>
      <div className="space-y-4 p-1">
        <label className="block text-sm font-semibold text-gray-700">
          배송 방식
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          <DeliveryOptionButton
            title="특급배송"
            selected={selectedType === 'express'}
            onClick={() => setSelectedType('express')}
            width={100}
            height={100}
          />
          <DeliveryOptionButton
            title="일반배송"
            selected={selectedType === 'standard'}
            onClick={() => setSelectedType('standard')}
            width={100}
            height={100}
          />
        </div>
      </div>

      <ResultCard
        ref={resultCardRef}
        country={selectedCountry}
        type={selectedType}
        box={items}
      />

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
