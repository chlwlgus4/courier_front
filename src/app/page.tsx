// src/app/page.tsx
'use client'

import Link from 'next/link'
import React, { ReactNode } from 'react'
import {
  FcAssistant,
  FcBullish,
  FcExport,
  FcGlobe,
  FcHome,
  FcLike,
  FcShop,
} from 'react-icons/fc'
import { FiHome } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      {' '}
      <main className="flex-1 overflow-auto px-4 py-3">
        {/* 공지/광고 배너 */}
        <div className="bg-blue-400 text-white rounded-xl h-36 flex items-center justify-center text-2xl font-semibold shadow">
          공지 및 광고
        </div>

        {/* 2×2 메뉴 그리드 */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[
            { icon: <FcGlobe size={32} />, label: '해외배송' },
            { icon: <FcShop size={32} />, label: '구매대행' },
            { icon: <FcExport size={32} />, label: '배송대행' },
            { icon: <FcHome size={32} />, label: '배대지' },
          ].map((item) => (
            <Link
              key={item.label}
              href={`/service/${item.label}`}
              className="bg-blue-400 text-white rounded-xl h-24 flex flex-col items-center justify-center shadow"
            >
              {item.icon}
              <span className="mt-2 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* 카테고리 아이콘 리스트 */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex space-x-4">
            {[
              { icon: <FcBullish size={28} />, label: '장보기' },
              { icon: <FcAssistant size={28} />, label: '한식' },
              { icon: <FcLike size={28} />, label: '디저트' },
              // 필요에 따라 추가…
            ].map((item) => (
              <div
                key={item.label}
                className="flex-shrink-0 flex flex-col items-center"
              >
                <div className="bg-white p-2 rounded-full shadow">
                  {item.icon}
                </div>
                <span className="mt-1 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t flex justify-around items-center">
        <NavItem href="/" label="홈" icon={<FiHome size={24} />} />
        <NavItem
          href="/shop"
          label="장보기·쇼핑"
          icon={<GiHamburgerMenu size={24} />}
        />
        <NavItem href="/favorites" label="찜" icon={<FcLike size={24} />} />
        <NavItem
          href="/orders"
          label="주문내역"
          icon={<FcAssistant size={24} />}
        />
        <NavItem
          href="/mypage"
          label="마이페이지"
          icon={<GiHamburgerMenu size={24} />}
        />
      </nav>
    </div>
  )
}

// 하단 내비게이션 아이템 컴포넌트
interface NavItemProps {
  href: string
  label: string
  icon: ReactNode
}

function NavItem({ href, label, icon }: Readonly<NavItemProps>) {
  // (active 로직 추가 가능)
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-gray-500 hover:text-blue-500"
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}
