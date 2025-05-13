'use client'

import Link from 'next/link'
import React from 'react'
import {
  FcAssistant,
  FcBullish,
  FcExport,
  FcGlobe,
  FcHome,
  FcLike,
  FcShop,
} from 'react-icons/fc'

const HomePage = () => {
  return (
    <div className="flex-1 overflow-auto scrollbar-hide px-4 py-3 rounded-t-md">
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
            { icon: <FcBullish size={28} />, label: '광고 업체1' },
            { icon: <FcAssistant size={28} />, label: '광고 업체2' },
            { icon: <FcLike size={28} />, label: '광고 업체3' },
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
    </div>
  )
}

export default HomePage
