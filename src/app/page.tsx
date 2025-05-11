// src/app/page.tsx
'use client'

import Image from 'next/image'
import {
  FcGlobe, // 해외배송
  FcShop, // 구매대행
  FcExport, // 배송대행
  FcHome, // 배대지
  FcBullish,
  FcAssistant,
  FcLike,
} from 'react-icons/fc'
import { FiBell, FiShoppingCart, FiHome } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <button>
          <GiHamburgerMenu size={24} />
        </button>
        <div className="font-bold text-lg">BBQ 판교대장지구점</div>
        <div className="flex items-center gap-4">
          <FiBell size={24} />
          <FiShoppingCart size={24} />
        </div>
      </header>

      {/* “잠깐 이 주소가 맞나요?” 검색 바 */}
      <div className="px-4 py-2 bg-blue-600 text-white rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/location-pin.svg" width={20} height={20} alt="" />
            <span>잠깐! 이 주소가 맞나요?</span>
          </div>
          <button className="font-bold">X</button>
        </div>
      </div>

      <main className="flex-1 overflow-auto px-4 py-3">
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
            <button
              key={item.label}
              className="bg-blue-400 text-white rounded-xl h-24 flex flex-col items-center justify-center shadow"
            >
              {item.icon}
              <span className="mt-2 font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 카테고리 아이콘 리스트 */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex space-x-4">
            {[
              { icon: <FcBullish size={28} />, label: '장보기' },
              { icon: <FcAssistant size={28} />, label: '한식' },
              { icon: <FcLike size={28} />, label: '디저트' },
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
      </main>

      {/* 하단 내비게이션 */}
      <nav className="h-16 bg-white border-t flex justify-around items-center">
        <button className="flex flex-col items-center text-blue-500">
          <FiHome size={24} />
          <span className="text-xs">홈</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <GiHamburgerMenu size={24} />
          <span className="text-xs">장보기·쇼핑</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FcLike size={24} />
          <span className="text-xs">찜</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FcAssistant size={24} />
          <span className="text-xs">주문내역</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <GiHamburgerMenu size={24} />
          <span className="text-xs">마이배민</span>
        </button>
      </nav>
    </div>
  )
}
