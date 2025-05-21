'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiBell, FiShoppingCart } from 'react-icons/fi'
import { SearchBar } from '@/commons/components/common/SearchBar'

const MobileHeader = () => {
  const path = usePathname()

  if (path !== '/') return null

  const hideHeaderPaths = ['/login', '/register']
  const shouldHideHeader = hideHeaderPaths.includes(path)

  if (shouldHideHeader) return null

  return (
    <header className={clsx('z-30', 'w-full', 'px-4', 'py-3', 'h-40')}>
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <Link href={'/'} className="font-bold text-lg text-white">
          쿠리어
        </Link>
        {/*<div className="font-bold text-lg">쿠리어</div>*/}
        <div className="flex items-center gap-4">
          <FiBell size={24} color={'#fff'} />
          <FiShoppingCart size={24} color={'#fff'} />
        </div>
      </div>
      <SearchBar borderColor={'border-teal-500'} />
    </header>
  )
}

export default MobileHeader
