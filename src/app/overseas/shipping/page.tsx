'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiUpload, FiArrowLeft } from 'react-icons/fi'

export default function ShippingPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 파일 업로드 및 매칭 요청 API 호출
    console.log('파일:', file)
    console.log('추가 메모:', notes)
    // 매칭 완료 후 목록 페이지로
    router.push('/overseas/result')
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주문 사진 업로드
          </label>
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 \
                file:rounded-lg file:border-0 \
                file:text-sm file:font-semibold \
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {file && <FiUpload className="w-6 h-6 text-blue-500 ml-2" />}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            추가 요청사항
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="특이사항이 있으시면 입력하세요"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-sm hover:bg-blue-700 transition"
          disabled={!file}
        >
          신청하기
        </button>
      </form>
    </div>
  )
}
