'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillCalculator, AiFillHome, AiFillProfile } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'

const navItems = [
  { label: '홈', icon: AiFillHome, path: '/' },
  { label: '견적', icon: AiFillCalculator, path: '/cost-calculator' },
  { label: '주문', icon: AiFillProfile, path: '/orders' },
  { label: '내 정보', icon: FiUser, path: '/mypage' },
]

const NavigationBar = () => {
  const pathname = usePathname()

  const hideHeaderPaths = ['/login', '/register']
  const shouldHideHeader = hideHeaderPaths.includes(pathname)

  if (shouldHideHeader) return null

  return (
    <nav className="bg-white shadow-sm fixed bottom-0 inset-x-0 h-16 flex justify-around items-center">
      {navItems.map(({ label, icon: Icon, path }) => {
        const isActive = pathname === path

        return (
          <Link
            href={path}
            key={path}
            className="flex flex-col items-center text-xs"
          >
            <Icon
              className={`text-xl mb-1 ${isActive ? 'text-gray-950' : 'text-gray-400'}`}
            />
            <span
              className={`${isActive ? 'text-gray-950 font-medium' : 'text-gray-400'}`}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default NavigationBar
