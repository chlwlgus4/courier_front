'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const country = searchParams.get('country') || ''
  const type = searchParams.get('type') || ''
  const item = searchParams.get('item') || ''
  const weight = parseFloat(searchParams.get('weight') || '0')

  // 예시: 국가 + 배송방식 + 무게에 따라 요금 계산
  const baseRate = type === 'express' ? 20000 : 10000
  const weightRate = weight * (type === 'express' ? 7000 : 4000)
  const totalEstimate = baseRate + weightRate

  const handleNext = () => {
    router.push(
      `/quote?country=${encodeURIComponent(country)}&type=${encodeURIComponent(
        type,
      )}&item=${encodeURIComponent(item)}&weight=${weight}&estimate=${totalEstimate}`,
    )
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      <h2 className="text-xl font-bold">배송 방법 안내</h2>

      <div className="border border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50">
        <p>
          <strong>배송 국가:</strong> {country}
        </p>
        <p>
          <strong>보낼 물건:</strong> {item}
        </p>
        <p>
          <strong>예상 무게:</strong> {weight}kg
        </p>
        <p>
          <strong>배송 방식:</strong>{' '}
          {type === 'express' ? '특급배송' : '일반배송'}
        </p>
        <p>
          <strong>예상 요금:</strong>{' '}
          <span className="text-blue-600 font-semibold">
            {totalEstimate.toLocaleString()}원
          </span>
        </p>
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
        onClick={handleNext}
      >
        견적 확인하기
      </button>
    </div>
  )
}

export default Page
