'use client'

import Link from 'next/link'
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
  const item = config[category]
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <Link
        href={item.href}
        className="bg-blue-400 text-white rounded-xl h-24 flex flex-col items-center justify-center shadow"
      >
        {item.icon}
        <span className="mt-2 font-medium">{item.label}</span>
      </Link>
      {/* 필요하다면 하위 다른 카드들 추가 */}
    </div>
  )
}

export default ServiceGrid
