'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const QuotePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const country = searchParams.get('country') || ''
  const type = searchParams.get('type') || ''
  const item = searchParams.get('item') || ''
  const weight = parseFloat(searchParams.get('weight') || '0')
  const estimate = parseInt(searchParams.get('estimate') || '0')

  // 고정 단가 (나중에 서버에서 받아와도 됨)
  const packagingFee = 3000
  const pickupFee = 5000

  const total = estimate + packagingFee + pickupFee

  const handleNext = () => {
    router.push(
      `/invoice?country=${encodeURIComponent(country)}&type=${encodeURIComponent(
        type,
      )}&item=${encodeURIComponent(item)}&weight=${weight}&total=${total}`,
    )
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      <h2 className="text-xl font-bold">견적 요약</h2>

      <div className="border rounded-lg p-4 bg-gray-50 space-y-2 text-sm">
        <p>
          <strong>배송 국가:</strong> {country}
        </p>
        <p>
          <strong>물건 종류:</strong> {item}
        </p>
        <p>
          <strong>배송 방식:</strong>{' '}
          {type === 'express' ? '특급배송' : '일반배송'}
        </p>
        <p>
          <strong>예상 무게:</strong> {weight}kg
        </p>
        <hr />
        <p>
          <strong>기본 배송비:</strong> {estimate.toLocaleString()}원
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
        인보이스 작성하기
      </button>
    </div>
  )
}

export default QuotePage
