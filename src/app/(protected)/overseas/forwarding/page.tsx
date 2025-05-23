'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import ImageSwiper from './components/ImageSwiper'
import { apiPost } from '@/lib/fetcher'

export default function ShippingForwardingPage() {
  const router = useRouter()
  // 업로드할 이미지 파일들
  const [images, setImages] = useState<File[]>([])
  // 추가 요청사항
  const [notes, setNotes] = useState('')
  // 실제 물건 무게 (kg 단위)
  const [weight, setWeight] = useState<number | ''>('')
  // 선택적 보험금액 (원)
  const [insuranceValue, setInsuranceValue] = useState<number | ''>('')

  /** 파일 선택 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selected = Array.from(e.target.files)
    const slotsLeft = 5 - images.length
    if (slotsLeft <= 0) {
      alert('최대 5개까지 업로드할 수 있습니다.')
      return
    }

    const toAdd = selected.slice(0, slotsLeft)
    if (selected.length > slotsLeft) {
      alert(
        `최대 5개까지 업로드 가능하며, 앞에서부터 ${toAdd.length}개만 추가됩니다.`,
      )
    }
    setImages((prev) => [...prev, ...toAdd])
    // 같은 파일 재선택 허용을 위해 값을 비워둡니다
    e.target.value = ''
  }

  /** 단일 이미지 삭제 */
  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  /** 폼 제출 */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (weight === '' || isNaN(weight) || weight <= 0) {
      alert('실제 무게를 올바르게 입력해주세요.')
      return
    }

    // FormData 에 모든 필드와 파일을 담아서 전송
    const form = new FormData()
    form.append('weight', weight.toString())
    // 보험금액이 빈 값이 아닐 때만
    if (insuranceValue !== '') {
      form.append('insuranceValue', insuranceValue.toString())
    }
    form.append('notes', notes)
    images.forEach((file) => form.append('images', file, file.name))

    const res = await apiPost<{ id: number }>('/shipping/forwarding', form)
    if (res && res.id) {
      // 성공 시 결과 페이지로 이동
      router.push(`/overseas/shipping/result?id=${res.id}`)
    }
  }

  return (
    <div className="px-4 py-6">
      <Link
        href="/overseas"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <FiArrowLeft className="w-5 h-5 mr-1" />
        뒤로
      </Link>

      <h1 className="text-2xl font-bold mb-4">배송대행 신청</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주문 사진 업로드 (최대 5장)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={images.length >= 5}
            className="sr-only"
            id="forwarding-images"
          />
          <label
            htmlFor="forwarding-images"
            className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 transition"
          >
            파일 선택
          </label>
          {images.length > 0 && (
            <ImageSwiper images={images} removeImage={removeImage} />
          )}
        </div>

        {/* 실제 무게 */}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            실제 무게 (kg)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="weight"
            step="0.01"
            min="0"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))
            }
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 1.25"
          />
        </div>

        {/* 보험 금액 */}
        <div>
          <label
            htmlFor="insurance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            보험금액 (원)
          </label>
          <input
            type="number"
            id="insurance"
            min="0"
            value={insuranceValue}
            onChange={(e) =>
              setInsuranceValue(
                e.target.value === '' ? '' : parseInt(e.target.value),
              )
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 10000"
          />
        </div>

        {/* 추가 요청사항 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            추가 요청사항
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="특이사항이 있으면 입력하세요"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
          disabled={images.length === 0 || weight === ''}
        >
          신청하기
        </button>
      </form>
    </div>
  )
}
