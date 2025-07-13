'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const country = searchParams.get('country') || ''
  const type = searchParams.get('type') || ''

  const [itemCategory, setItemCategory] = useState<string>('')
  const [weight, setWeight] = useState<string>('')

  const handleNext = () => {
    if (!itemCategory || !weight) {
      alert('보내는 물건과 무게를 입력해주세요.')
      return
    }

    router.push(
      `/method?country=${encodeURIComponent(country)}&type=${encodeURIComponent(type)}&item=${encodeURIComponent(itemCategory)}&weight=${encodeURIComponent(weight)}`,
    )
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      <h2 className="text-xl font-bold">어떤 물건을 어디로 보내세요?</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          물건 종류
        </label>
        <select
          className="w-full border rounded-lg p-2"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <option value="">선택하세요</option>
          <option value="의류">의류</option>
          <option value="전자제품">전자제품</option>
          <option value="건강식품">건강식품</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          예상 무게 (kg)
        </label>
        <input
          type="number"
          placeholder="예: 1.5"
          className="w-full border rounded-lg p-2"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
        onClick={handleNext}
      >
        다음 단계로
      </button>
    </div>
  )
}

export default Page
