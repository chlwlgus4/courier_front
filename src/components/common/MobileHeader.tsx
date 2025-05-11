'use client'

import { FiBell, FiShoppingCart } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'

const MobileHeader = () => {
  return (
    <header className="bloack md:hidden fixed z-30 w-full px-4 py-3 bg-white shadow">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <button>
          <GiHamburgerMenu size={24} />
        </button>
        <div className="font-bold text-lg">BBQ 판교대장지구점</div>
        <div className="flex items-center gap-4">
          <FiBell size={24} />
          <FiShoppingCart size={24} />
        </div>
      </div>
    </header>
  )
}

export default MobileHeader
