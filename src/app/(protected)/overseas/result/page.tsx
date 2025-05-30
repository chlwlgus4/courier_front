'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SERVICE_NAME } from '@/config'
import { overseasStore } from '@/store/overseasStore'

// (임시) 매칭 결과 타입 정의
interface CourierMatch {
  id: string
  name: string
  logoUrl: string
  eta: string
  price: number
}

const Page = () => {
  const { overseas } = overseasStore()
  const router = useRouter()

  if (!overseas?.images) {
    router.back()
    return null
  }

  // TODO: 실제 API 호출로 대체
  const matches: CourierMatch[] = [
    {
      id: 'fedex-123',
      name: 'FastExpress',
      logoUrl: '/logos/fedex.png',
      eta: '3–5일',
      price: 54000,
    },
    {
      id: 'dhl-456',
      name: 'QuickDHL',
      logoUrl: '/logos/dhl.png',
      eta: '4–6일',
      price: 58000,
    },
    {
      id: 'ems-789',
      name: 'EMS Korea',
      logoUrl: '/logos/ems.png',
      eta: '5–7일',
      price: 50000,
    },
  ]

  return (
    <div className="px-4 py-6 space-y-6">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">주문 정보</h2>
        <div className="bg-white p-4 rounded-xl shadow">
          {/* TODO: 실제 주문 정보 */}
          <p>서비스: {SERVICE_NAME[overseas?.type as string]}</p>
          <p>출발지: {overseas?.originCountry?.name}</p>
          <p>도착지: {overseas?.destCountry?.name}</p>
          <p>총 무게: {overseas?.weight}kg</p>
          <p>보험 금액: {overseas?.insuranceValue}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">추천 쿠리어</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {matches.map((c) => (
            <div
              key={c.id}
              className="flex items-center bg-white p-4 rounded-xl shadow"
            >
              <Image
                src={c.logoUrl}
                alt={c.name}
                width={300}
                height={300}
                className="w-12 h-12 object-contain mr-4"
              />
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">도착까지 {c.eta}</p>
              </div>
              <div className="ml-auto text-lg font-bold">
                {c.price.toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={() => router.push('/')}
        className="w-full bg-toss-600 text-white py-3 rounded-lg font-medium shadow hover:bg-toss-700 transition"
      >
        다시 신청하기
      </button>
    </div>
  )
}

export default Page
