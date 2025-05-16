'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { FcGlobe, FcShop, FcExport, FcHome } from 'react-icons/fc'
import { Category, GridProps } from '@/commons/types'

const config: Record<
  Category,
  { icon: ReactNode; label: string; href: string }
> = {
  overseas: {
    icon: <FcGlobe size={28} />,
    label: '해외배송',
    href: '/services?cat=overseas',
  },
  purchase: {
    icon: <FcShop size={28} />,
    label: '구매대행',
    href: '/services?cat=purchase',
  },
  forwarding: {
    icon: <FcExport size={28} />,
    label: '배송대행',
    href: '/services?cat=forwarding',
  },
  warehouse: {
    icon: <FcHome size={28} />,
    label: '배대지',
    href: '/services?cat=warehouse',
  },
}

const ServiceGrid = ({ category }: Readonly<GridProps>) => {
  // const item = config[category]
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
        >
          <div>
            <h3 className="text-base font-bold mb-2">
              [제목] 판매글 제목 {i + 1}
            </h3>
            <p className="text-sm text-gray-600">판매 내용</p>
          </div>
          <button
            className="mt-4 w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base rounded-md font-semibold transition-colors"
            onClick={() => router.push('/post/1')}
          >
            매칭 요청
          </button>
        </div>
      ))}
    </div>
  )
}

export default ServiceGrid
