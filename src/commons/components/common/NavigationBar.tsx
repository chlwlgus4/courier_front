'use client'

import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FcLike } from 'react-icons/fc'
import { FiHome, FiUser } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdReceiptLong } from 'react-icons/md'

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white flex justify-around items-center">
      <NavItem href="/" label="홈" icon={<FiHome size={24} />} />
      <NavItem
        href="/shop"
        label="견적요청"
        icon={<GiHamburgerMenu size={24} />}
      />
      <NavItem href="/favorites" label="찜" icon={<FcLike size={24} />} />
      <NavItem
        href="/orders"
        label="주문내역"
        icon={<MdReceiptLong size={24} />}
      />
      <NavItem href="/mypage" label="마이페이지" icon={<FiUser size={24} />} />
    </nav>
  )
}

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

export default NavigationBar
