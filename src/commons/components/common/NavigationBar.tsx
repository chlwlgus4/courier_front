'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavigationBar = () => {
  const path = usePathname()

  const hideHeaderPaths = ['/login', '/register']
  const shouldHideHeader = hideHeaderPaths.includes(path)

  if (shouldHideHeader) return null

  return (
    <nav className="bg-white shadow-sm fixed bottom-0 inset-x-0 h-16 flex justify-around items-center">
      {[
        { label: '홈', icon: '🏠', path: '/' },
        { label: '견적', icon: '💰', path: '/cost-calculator' },
        { label: '주문', icon: '📋', path: '/order' },
        { label: '내 정보', icon: '👤', path: '/mypage' },
      ].map(({ label, icon, path }) => (
        <Link href={path} key={path}>
          <button
            key={label}
            className="flex flex-col items-center text-sm text-gray-600 hover:bg-sky-200 transition p-2 rounded"
          >
            <span className="text-2xl mb-1 text-amber-300">{icon}</span>
            <span className="text-gray-700">{label}</span>
          </button>
        </Link>
      ))}
    </nav>
  )
}

export default NavigationBar
