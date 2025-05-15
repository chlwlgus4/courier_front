'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import CategoryTabs from '@/app/services/components/CategoryTabs'
import ServiceGrid from '@/app/services/components/ServiceGrid'
import { Category } from '@/commons/types'

const Page = () => {
  const router = useRouter()
  const params = useSearchParams()
  const paramCategory = params.get('category') as Category | null

  const [category, setCategory] = useState<Category>(
    paramCategory ?? 'overseas',
  )
  const handleChange = (newCategory: Category) => {
    setCategory(newCategory)
    router.replace(`/services?category=${newCategory}`)
  }

  return (
    <div className="px-4 py-6">
      {/* 탭 */}
      <CategoryTabs current={category} onChange={handleChange} />

      {/* 선택된 카테고리용 그리드 */}
      <ServiceGrid category={category} />
    </div>
  )
}

export default Page
