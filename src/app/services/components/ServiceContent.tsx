'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import CategoryTabs from '@/app/services/components/CategoryTabs'
import ServiceGrid from '@/app/services/components/ServiceGrid'
import { Category } from '@/app/services/types/category'
import { ServiceContentProps } from '@/app/services/types/service'

const ServiceContent = ({ initialCategory }: ServiceContentProps) => {
  const router = useRouter()

  const [category, setCategory] = useState<Category>(initialCategory)
  const handleChange = (newCategory: Category) => {
    setCategory(newCategory)
    router.replace(`/services?category=${newCategory}`)
  }

  return (
    <div className="px-4 py-6">
      <CategoryTabs current={category} onChange={handleChange} />
      <ServiceGrid category={category} />
    </div>
  )
}
export default ServiceContent
