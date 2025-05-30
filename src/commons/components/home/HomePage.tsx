'use client'

import Link from 'next/link'
import React from 'react'
import { FaBox, FaGlobe, FaShoppingCart } from 'react-icons/fa'
import FAQSection from './FAQSection'
import { SearchBar } from '@/commons/components/common/SearchBar'
import ServiceCard from '@/commons/components/home/ServiceCard'

const HomePage = () => {
  return (
    <div className="flex-1 p-4 space-y-6">
      <SearchBar placeholder={'운송장번호 조회'} />

      <section className="bg-toss-100 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          비교 견적으로 가장 저렴하게
        </h2>
        <p className="text-gray-600">
          다양한 쿠리어사를 한눈에 비교하고, 최적의 해외배송 서비스를
          이용해보세요.
        </p>
      </section>

      {/* 2×2 메뉴 그리드 */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href={'/overseas/country'}>
          <ServiceCard title="해외배송 매칭" icon={<FaGlobe />} />
        </Link>
        <Link href={'/purchase'}>
          <ServiceCard title="구매대행" icon={<FaShoppingCart />} />
        </Link>
        <Link href={'/overseas/forwarding'}>
          <ServiceCard title="배송대행" icon={<FaBox />} />
        </Link>
      </section>

      {/* FAQ Section */}
      <section className="bg-violet-50 rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          자주 묻는 질문
        </h3>
        <FAQSection />
      </section>
    </div>
  )
}

export default HomePage
