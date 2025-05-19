'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ImageSwiper from '@/app/overseas/components/ImageSwiper'
import { overseasStore } from '@/store/overseasStore'

export default function ShippingPage() {
  const router = useRouter()
  const [weight, setWeight] = useState<number>() // ← 무게 상태 추가
  const [images, setImages] = useState<File[]>([])
  const [notes, setNotes] = useState('')

  const { overseas, setOverseas } = overseasStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selected = Array.from(e.target.files)
    const availableSlots = 5 - images.length

    if (availableSlots <= 0) {
      alert('최대 5개까지 업로드할 수 있습니다.')
      return
    }

    const toAdd = selected.slice(0, availableSlots)
    if (selected.length > availableSlots) {
      alert(
        `최대 5개까지 업로드 가능하며, 앞에서부터 ${toAdd.length}개만 추가됩니다.`,
      )
    }

    setImages((prev) => [...prev, ...toAdd])
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!weight) {
      alert('무게를 입력해주세요.')
      return
    }

    // TODO: 파일 업로드, weight, notes 함께 API 호출
    console.log('무게:', weight, 'kg')
    console.log('파일:', images)
    console.log('추가 메모:', notes)

    setOverseas({ ...overseas, images, notes, weight })

    router.push('/overseas/result')
  }

  return (
    <div className="px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        {/* 1. 무게 입력 */}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            총 무게(kg)
          </label>
          <input
            id="weight"
            type="number"
            step="0.1"
            min="0"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 2.5"
            required
          />
        </div>

        {/* 2. 사진 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주문 사진 업로드 (최대 5개)
          </label>
          <div className="flex items-center">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="sr-only"
              disabled={images.length >= 5}
            />
            <label
              htmlFor="image-upload"
              className="inline-block py-2 px-4 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 transition mb-4"
            >
              파일 선택
            </label>
          </div>
          {images.length > 0 && (
            <ImageSwiper images={images} removeImage={removeImage} />
          )}
        </div>

        {/* 3. 추가 요청사항 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            추가 요청사항
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="특이사항이 있으시면 입력하세요"
          />
        </div>

        {/* 4. 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-sm hover:bg-blue-700 transition"
          disabled={!images.length}
        >
          신청하기
        </button>
      </form>
    </div>
  )
}
