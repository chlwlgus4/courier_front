'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { getOrder } from '@/api/orders'
import ImageSwiper from '@/app/(protected)/overseas/components/ImageSwiper'
import { Order } from '@/commons/types/orders'
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
  const params = useSearchParams()

  const [order, setOrder] = React.useState<Order | null>(null)

  useEffect(() => {
    const id = Number(params.get('id'))
    if (!isNaN(id) && id > 0) {
      getOrder(id).then(({ data, status }) => {
        if (status == 200) setOrder(data)
      })
    }
  }, [params])

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
          <p>서비스: {order?.shippingType}</p>
          <p>출발지: {order?.originCountry?.name}</p>
          <p>도착지: {order?.destinationCountry?.name}</p>
          <p>총 무게: {order?.weight}kg</p>
          <p>보험 금액: {order?.insuranceValue.toLocaleString()}원</p>
        </div>
        {order?.images.length && (
          <ImageSwiper images={order.images.map((img) => img.base64Data)} />
        )}
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
