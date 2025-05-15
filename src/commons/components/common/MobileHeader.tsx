'use client'

import Link from 'next/link'
import { FiBell, FiShoppingCart } from 'react-icons/fi'
import { SearchBar } from '@/commons/components/common/SearchBar'

const MobileHeader = () => {
  return (
    <header className="block md:hidden z-30 w-full px-4 py-3 bg-cyan-950 shadow h-40">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <Link href={'/public'} className="font-bold text-lg text-white">
          쿠리어
        </Link>
        {/*<div className="font-bold text-lg">쿠리어</div>*/}
        <div className="flex items-center gap-4">
          <FiBell size={24} color={'#fff'} />
          <FiShoppingCart size={24} color={'#fff'} />
        </div>
      </div>
      <SearchBar />
    </header>
  )
}

export default MobileHeader
