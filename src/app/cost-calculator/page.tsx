'use client'

import React, { useState } from 'react'

// 샘플 국가별 기본요금(base) 및 kg당 요금(perKg)
const shippingRates: Record<
  string,
  { name: string; base: number; perKg: number }
> = {
  US: { name: '미국', base: 50, perKg: 10 },
  CN: { name: '중국', base: 40, perKg: 8 },
  JP: { name: '일본', base: 45, perKg: 9 },
  DE: { name: '독일', base: 55, perKg: 11 },
  GB: { name: '영국', base: 60, perKg: 12 },
}

// 보험료율 (예: 보험금액의 1%)
const INSURANCE_RATE = 0.01

export default function CostCalculatorPage() {
  const [country, setCountry] = useState('US')
  const [actualWeight, setActualWeight] = useState('')
  const [lengthCm, setLengthCm] = useState('')
  const [widthCm, setWidthCm] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [insuredValue, setInsuredValue] = useState('')

  // 문자열을 숫자로 변환
  const toNumber = (val: string) => parseFloat(val) || 0

  // 부피 무게 (L×W×H / 5000)
  const volumetricWeight = () =>
    (toNumber(lengthCm) * toNumber(widthCm) * toNumber(heightCm)) / 5000

  // 과금 무게 = 실제 무게 vs 부피 무게 중 큰 값
  const chargeableWeight = Math.max(toNumber(actualWeight), volumetricWeight())

  // 보험료 = 보험 신청 금액 × 보험료율
  const insuranceFee = toNumber(insuredValue) * INSURANCE_RATE

  // 총 비용 계산
  const calculateCost = () => {
    const rate = shippingRates[country]
    return rate.base + rate.perKg * chargeableWeight + insuranceFee
  }

  const totalCost = calculateCost()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            배송 국가
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {Object.entries(shippingRates).map(([code, info]) => (
              <option key={code} value={code}>
                {info.name}
              </option>
            ))}
          </select>
        </div>

        {/* 실제 무게 입력 */}
        <div className="mb-4">
          <label
            htmlFor="actualWeight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            실제 무게 (kg)
          </label>
          <input
            id="actualWeight"
            type="number"
            step="0.1"
            min="0"
            value={actualWeight}
            onChange={(e) => setActualWeight(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 2.3"
          />
        </div>

        {/* 부피 무게 계산용 치수 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            부피 치수 (cm)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              step="0.1"
              min="0"
              value={lengthCm}
              onChange={(e) => setLengthCm(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="길이"
            />
            <input
              type="number"
              step="0.1"
              min="0"
              value={widthCm}
              onChange={(e) => setWidthCm(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="폭"
            />
            <input
              type="number"
              step="0.1"
              min="0"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="높이"
            />
          </div>
        </div>

        {/* 보험 신청 금액 입력 */}
        <div className="mb-4">
          <label
            htmlFor="insuredValue"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            보험 신청 금액 (원)
          </label>
          <input
            id="insuredValue"
            type="number"
            step="100"
            min="0"
            value={insuredValue}
            onChange={(e) => setInsuredValue(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 1000000"
          />
        </div>

        {/* 계산 결과 요약 */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <p>
            실 무게:{' '}
            <span className="font-medium">
              {toNumber(actualWeight).toFixed(2)}kg
            </span>
          </p>
          <p>
            부피 무게:{' '}
            <span className="font-medium">
              {volumetricWeight().toFixed(2)}kg
            </span>
          </p>
          <p>
            과금 무게:{' '}
            <span className="font-medium">{chargeableWeight.toFixed(2)}kg</span>
          </p>
          <p>
            보험료:{' '}
            <span className="font-medium">
              {insuranceFee.toLocaleString()}원
            </span>
          </p>
          <p className="text-lg mt-2">
            총 예상 배송비:{' '}
            <span className="font-bold text-blue-600">
              {totalCost.toLocaleString()}원
            </span>
          </p>
        </div>

        {/* 안내 문구 */}
        <p className="text-sm text-gray-500 text-center">
          * 실제 요금은 부가 서비스,
        </p>
        <p className="text-sm text-gray-500 text-center">
          세관 수수료 및 환율에 따라 달라질 수 있습니다.
        </p>
      </div>
    </div>
  )
}
