'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { apiPost } from '@/lib/fetcher'

const PurchaseForm = () => {
  const router = useRouter()

  // 상품 URL
  const [productUrl, setProductUrl] = useState<string>('')
  const [images, setImages] = useState<File[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [notes, setNotes] = useState<string>('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const selected = Array.from(files)
    setImages((prev) => [...prev, ...selected].slice(0, 5))
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // TODO: formData 로 파일 & 다른 필드 전송
    const form = new FormData()
    form.append('productUrl', productUrl)
    form.append('quantity', quantity.toString())
    form.append('notes', notes)
    images.forEach((f) => form.append('images', f, f.name))

    const res = await apiPost<{ id: number }>('/purchase', form)
    if (res) {
      router.push(`/purchase/result?id=${res.id}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow"
    >
      {/* 상품 URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품 페이지 URL
        </label>
        <input
          type="url"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
          required
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 스크린샷 이미지 업로드 (최대 5개) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품 사진 업로드 (최대 5개)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={images.length >= 5}
        />
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {images.map((f, i) => (
              <div key={f.name + i} className="relative">
                <Image
                  src={URL.createObjectURL(f)}
                  alt={`선택된 이미지 ${i + 1}`}
                  width={100}
                  height={100}
                  className="rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded hover:bg-opacity-80"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 수량 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          수량
        </label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 추가 요청사항 */}
      <div>
        <label
          htmlFor={'notes'}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          추가 요청사항
        </label>
        <textarea
          id={'notes'}
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="특이사항이 있으면 작성해주세요"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={!productUrl || !quantity}
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        신청하기
      </button>
    </form>
  )
}

export default PurchaseForm
