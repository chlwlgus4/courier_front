'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const ApplyPage = () => {
  const searchParams = useSearchParams()
  const country = searchParams.get('country')
  const type = searchParams.get('type')

  const [senderCity, setSenderCity] = useState('')
  const [senderZip, setSenderZip] = useState('')
  const [receiverCity, setReceiverCity] = useState('')
  const [receiverZip, setReceiverZip] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [documentsOnly, setDocumentsOnly] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !senderCity ||
      !senderZip ||
      !receiverCity ||
      !receiverZip ||
      !weight ||
      !length ||
      !width ||
      !height
    ) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    const data = {
      country,
      type,
      senderCity,
      senderZip,
      receiverCity,
      receiverZip,
      weight,
      length,
      width,
      height,
      documentsOnly,
    }

    console.log('신청 정보:', data)
    alert('배송 신청이 완료되었습니다.')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-gray-100 p-4 rounded-xl space-y-2 text-sm text-gray-700">
        <p>
          <strong>배송 국가:</strong> {country}
        </p>
        <p>
          <strong>배송 방식:</strong> {type}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">출발지</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="도시"
              value={senderCity}
              onChange={(e) => setSenderCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="text"
              placeholder="우편번호"
              value={senderZip}
              onChange={(e) => setSenderZip(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">도착지</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="도시"
              value={receiverCity}
              onChange={(e) => setReceiverCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="text"
              placeholder="우편번호"
              value={receiverZip}
              onChange={(e) => setReceiverZip(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            화물 정보
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="무게 (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="number"
              placeholder="길이 (cm)"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="number"
              placeholder="너비 (cm)"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="number"
              placeholder="높이 (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <div className="mt-4 flex items-start gap-2 relative">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={documentsOnly}
                onChange={(e) => setDocumentsOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">서류만 포함됨</span>
            </label>
            <button
              type={'button'}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="ml-2 border border-gray-400 rounded-full h-6 w-6 flex items-center justify-center text-gray-700 cursor-pointer relative"
            >
              ?
              {showTooltip && (
                <div className="absolute bottom-full mb-2 left-0 w-80 bg-white text-sm text-gray-800 border border-gray-300 rounded-xl shadow-lg p-4 z-10">
                  <strong className="block mb-1">
                    왜 아래 정보가 필요한가요?
                  </strong>
                  <div className="mt-2">
                    화물에 서류만 포함된 경우 EU를 제외한 국가에서는 통관이
                    간소화 됩니다. 해당 옵션 선택 유무에 따라 배송 소요시간이
                    달라질 수 있습니다.
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold"
        >
          배송 신청하기
        </button>
      </form>
    </div>
  )
}

export default ApplyPage
