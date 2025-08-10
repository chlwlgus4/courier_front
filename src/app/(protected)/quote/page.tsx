'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { deliveryStore } from '@/store/deliveryStore'

const QuotePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { country, items, deliveryType, deliveryFee } = deliveryStore()

  const item = searchParams.get('item') || ''
  const weight = parseFloat(searchParams.get('weight') || '0')
  const estimate = parseInt(searchParams.get('estimate') || '0')

  const packagingFee = 3000
  const pickupFee = 5000

  const total = estimate + packagingFee + pickupFee

  const handleNext = () => {
    router.push('/invoice')
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-2 text-sm">
        <p>
          <strong>배송 국가:</strong> {country?.nameKo}
        </p>
        <p>
          <strong>물건 종류:</strong> {item}
        </p>
        <p>
          <strong>배송 방식:</strong>{' '}
          {deliveryType === 'express' ? '특급배송' : '일반배송'}
        </p>
        <p>
          <strong>예상 무게:</strong> {weight}kg
        </p>
        <hr />
        <p>
          <strong>기본 배송비:</strong> {deliveryFee.toLocaleString()}원
        </p>
        <p>
          <strong>포장비:</strong> {packagingFee.toLocaleString()}원
        </p>
        <p>
          <strong>픽업비:</strong> {pickupFee.toLocaleString()}원
        </p>
        <hr />
        <p className="text-lg font-semibold text-blue-600">
          총 예상 견적: {total.toLocaleString()}원
        </p>
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
        onClick={handleNext}
      >
        배송 정보 작성 하기
      </button>
    </div>
  )
}

export default QuotePage
