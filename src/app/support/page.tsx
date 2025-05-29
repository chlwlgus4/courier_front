'use client'

import { useState } from 'react'
import FaqLayout from '@/app/support/faq/components/FaqLayout'
import { SearchBar } from '@/commons/components/common/SearchBar'

// 탭과 카테고리 정의 (원하는 만큼 늘려서 사용)
const TABS = ['홈', 'FAQ', '문의내역', '고객의 소리', '공지'] as const

const Page = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('홈')

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 상단 헤더 (뒤로 가기 + 타이틀) */}
      <header className="sticky top-0 bg-white z-10 shadow-sm mt-2">
        {/* 스크롤 가능한 탭 */}
        <div className="overflow-x-auto">
          <ul className="flex whitespace-nowrap px-4 justify-around">
            {TABS.map((tab) => (
              <li key={tab} className="mr-6 last:mr-0">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* 검색바 */}
      <div className="mt-3">
        <SearchBar
          placeholder="궁금한 점을 검색해보세요"
          borderColor={'border-gray-400'}
          focusBorderColor={'border-gray-300'}
          iconColor={'text-gray-500'}
        />
      </div>

      {activeTab === 'FAQ' && <FaqLayout />}

      {/* 본문 */}
      <main className="px-4 mt-4 space-y-4">
        {activeTab === '문의내역' && (
          <p className="text-gray-500 text-center py-10">
            아직 문의 내역이 없습니다.
          </p>
        )}

        {activeTab === '고객의 소리' && (
          <p className="text-gray-500 text-center py-10">
            고객님의 소리를 들려주세요!
          </p>
        )}

        {activeTab === '공지' && (
          <p className="text-gray-500 text-center py-10">
            최신 공지를 확인하세요.
          </p>
        )}

        {activeTab === '홈' && (
          <p className="text-gray-500 text-center py-10">
            원하는 탭을 선택해 주세요.
          </p>
        )}
      </main>
    </div>
  )
}

export default Page
