'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PAGE_TITLES } from '@/config'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    // 기본 경로에서는 뒤로가기 버튼 안보이도록
    setShowBack(pathname !== '/' && pathname !== '/home')
  }, [pathname])

  const hideHeaderPaths = ['/login', '/register']
  if (hideHeaderPaths.includes(pathname)) return null

  let pageTitle = ''
  if (PAGE_TITLES[pathname]) {
    pageTitle = PAGE_TITLES[pathname]
  } else if (
    pathname.startsWith('/orders/') &&
    pathname.split('/').length === 3
  ) {
    pageTitle = PAGE_TITLES['/orders/[id]'] ?? ''
  } else if (
    pathname.startsWith('/overseas/') &&
    pathname.split('/').length === 3
  ) {
    const type = pathname.split('/')[2]
    pageTitle = PAGE_TITLES[`/overseas/${type}`] ?? ''
  }

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      {showBack ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="md:hidden flex items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-900 transition relative top-[-3px]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 leading-none">
            {pageTitle}
          </h1>
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-gray-800 leading-none">
          Courier
        </h1>
      )}
      <nav className="flex space-x-6">
        <Link href="/">
          <button className="text-gray-600 hover:text-gray-800">홈</button>
        </Link>
        <Link href="/orders">
          <button className="text-gray-600 hover:text-gray-800">내역</button>
        </Link>
        <Link href="/mypage">
          <button className="text-gray-600 hover:text-gray-800">내 정보</button>
        </Link>
      </nav>
    </header>
  )
}
