'use client'

import Link from 'next/link'
import { FiBell, FiShoppingCart } from 'react-icons/fi'
import { SearchBar } from '@/components/common/SearchBar'

const MobileHeader = () => {
  return (
    <header className="bloack md:hidden z-30 w-full px-4 py-3 bg-white shadow">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <button>
          <Link href={'/'} className="font-bold text-lg">
            쿠리어
          </Link>
        </button>
        {/*<div className="font-bold text-lg">쿠리어</div>*/}
        <div className="flex items-center gap-4">
          <FiBell size={24} />
          <FiShoppingCart size={24} />
        </div>
      </div>
      <SearchBar />
    </header>
  )
}

export default MobileHeader
