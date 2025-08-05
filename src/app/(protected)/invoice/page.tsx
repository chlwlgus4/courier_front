'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CountrySelect from '@/commons/components/home/CountrySelect'
import useCountryStore from '@/store/countryStore'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getCountry } = useCountryStore()

  const country = searchParams.get('country') || ''
  const type = searchParams.get('type') || ''
  const item = searchParams.get('item') || ''
  const weight = searchParams.get('weight') || ''
  const total = searchParams.get('total') || '0'

  const [senderName, setSenderName] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [receiverPostalCode, setReceiverPostalCode] = useState('')
  const [receiverCountry, setReceiverCountry] = useState('')
  const [receiverCity, setReceiverCity] = useState('')
  const [receiverState, setReceiverState] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const [itemDesc, setItemDesc] = useState('')

  const handleSubmit = () => {
    if (
      !senderName ||
      !senderPhone ||
      !receiverName ||
      !receiverPhone ||
      !receiverPostalCode ||
      !receiverCountry ||
      !receiverCity ||
      !receiverState ||
      !receiverAddress ||
      !itemDesc
    ) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    // 실제로는 여기서 백엔드에 인보이스 저장 또는 주문 생성 요청 가능

    router.push('/payment')
  }

  useEffect(() => {
    const recvCountry = getCountry(country)
    if (recvCountry) setReceiverCountry(String(recvCountry?.id))
  }, [getCountry, country])

  return (
    <div className="flex-1 p-4 space-y-6">
      <h1>보내는 사람</h1>
      <div className="space-y-4 text-sm">
        <div>
          <label className="font-medium block">이름</label>
          <input
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="홍길동"
          />
        </div>

        <div>
          <label className="font-medium block">연락처</label>
          <input
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            placeholder="010-1234-5678"
          />
        </div>

        <hr />

        <h1>받는 사람</h1>
        <div>
          <label className="font-medium block">이름</label>
          <input
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="받는 사람의 성명을 영문으로 적어주세요"
          />
        </div>

        <div>
          <label className="font-medium block">연락처</label>
          <input
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            placeholder="받는 사람의 현지 연락처를 입력해주세요"
          />
        </div>
        <div>
          <label className="font-medium block">우편번호</label>
          <input
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
            value={receiverPostalCode}
            onChange={(e) => setReceiverPostalCode(e.target.value)}
            placeholder="배송지 우편번호를 입력해주세요"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="font-medium block">국가</label>
            <CountrySelect
              className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
              value={receiverCountry}
              onChange={setReceiverCountry}
            />
          </div>
          <div className="flex-1">
            <label className="font-medium block">도시</label>
            <input
              className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
              value={receiverCity}
              onChange={(e) => setReceiverCity(e.target.value)}
              placeholder="배송지 도시명을 영문으로 입력해주세요."
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="font-medium block">주/도</label>
            <input
              className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
              value={receiverState}
              onChange={(e) => setReceiverState(e.target.value)}
              placeholder="배송지 주/도명을 영문으로 입력해주세요."
            />
          </div>
          <div className="flex-1">
            <label className="font-medium block">상세 주소</label>
            <input
              className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              placeholder="배송지 주소를 영문으로 입력해주세요."
            />
          </div>
        </div>

        <div>
          <label className="font-medium block">물품 상세 설명</label>
          <textarea
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-lg"
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
