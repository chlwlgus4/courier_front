'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PAGE_TITLES } from '@/config/pageTitle'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    // 기본 경로에서는 뒤로가기 버튼 안보이도록
    setShowBack(pathname !== '/' && pathname !== '/home')
  }, [pathname])

  if (pathname === '/') return null

  const hideHeaderPaths = ['/login', '/register']
  const shouldHideHeader = hideHeaderPaths.includes(pathname)
  // 로그인, 회원가입 페이지는 헤더 표시 안함
  if (shouldHideHeader) return null
  const pageTitle = PAGE_TITLES[pathname] ?? ''

  return (
    <header className="top-0 left-0 right-0 z-30 bg-white shadow">
      <div className="px-6 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* 모바일 뒤로가기 버튼 */}
          {showBack && (
            <button
              onClick={() => router.back()}
              className="md:hidden text-gray-600 hover:text-gray-900 transition cursor-pointer"
              aria-label="뒤로가기"
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
          )}
          <h1 className="text-xl font-bold hidden md:block">
            <Link href={'/'}>쿠리어</Link>
          </h1>
        </div>
        {pageTitle && (
          <span className="md:hidden ml-3 text-xl font-bold text-gray-95000">
            {pageTitle}
          </span>
        )}

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/post" className="hover:text-blue-600">
            판매글 등록
          </Link>
          <Link href="#">내 매칭</Link>
          <Link href="#">프로필</Link>
        </nav>

        <button
          className="md:hidden text-gray-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 fixed top-[64px] left-0 w-full shadow-md z-30">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            <Link href="/post">판매글 등록</Link>
            <Link href="#">내 매칭</Link>
            <Link href="#">프로필</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
