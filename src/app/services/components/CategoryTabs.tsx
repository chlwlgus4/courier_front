'use client'

import React from 'react'
import { CategoryProps, Category } from '@/commons/types'

const tabs: { id: Category; label: string }[] = [
  { id: 'overseas', label: '해외배송' },
  { id: 'purchase', label: '구매대행' },
  { id: 'forwarding', label: '배송대행' },
  { id: 'warehouse', label: '배대지' },
]

const CategoryTabs = ({ current, onChange }: Readonly<CategoryProps>) => {
  return (
    <div className="flex space-x-4 overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`
            px-4 py-2 rounded-full whitespace-nowrap
            ${
              current === t.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }
          `}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
