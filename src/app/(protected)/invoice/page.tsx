'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const country = searchParams.get('country') || ''
  const type = searchParams.get('type') || ''
  const item = searchParams.get('item') || ''
  const weight = searchParams.get('weight') || ''
  const total = searchParams.get('total') || '0'

  const [senderName, setSenderName] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const [itemDesc, setItemDesc] = useState('')

  const handleSubmit = () => {
    if (
      !senderName ||
      !senderPhone ||
      !receiverName ||
      !receiverPhone ||
      !receiverAddress ||
      !itemDesc
    ) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    // 실제로는 여기서 백엔드에 인보이스 저장 또는 주문 생성 요청 가능

    router.push('/payment')
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      <h2 className="text-xl font-bold">인보이스 정보 입력</h2>

      <div className="space-y-4 text-sm">
        <div>
          <label className="font-medium block">송화인 이름</label>
          <input
            className="w-full border p-2 rounded-lg"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="홍길동"
          />
        </div>

        <div>
          <label className="font-medium block">송화인 연락처</label>
          <input
            className="w-full border p-2 rounded-lg"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            placeholder="010-1234-5678"
          />
        </div>

        <hr />

        <div>
          <label className="font-medium block">수하인 이름</label>
          <input
            className="w-full border p-2 rounded-lg"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="font-medium block">수하인 연락처</label>
          <input
            className="w-full border p-2 rounded-lg"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            placeholder="+1-123-456-7890"
          />
        </div>

        <div>
          <label className="font-medium block">수하인 주소</label>
          <textarea
            className="w-full border p-2 rounded-lg"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            placeholder="123 Street, City, Country"
          />
        </div>

        <div>
          <label className="font-medium block">물품 상세 설명</label>
          <textarea
            className="w-full border p-2 rounded-lg"
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            placeholder="예: 의류 3벌, 총 무게 2kg"
          />
        </div>
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
        onClick={handleSubmit}
      >
        결제하기
      </button>
    </div>
  )
}

export default Page
