'use client'

import React, { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: '해외 배송은 어떻게 신청하나요?',
    answer:
      '홈 화면에서 “해외배송”을 선택한 뒤, 국가를 고르고 무게와 사진을 업로드하시면 매칭 요청이 접수됩니다.',
  },
  {
    question: '부피무게와 실제 무게 중 어떤 것이 과금되나요?',
    answer:
      '부피무게(가로×세로×높이/5,000)와 실제 무게 중 더 큰 값이 과금 무게로 적용됩니다.',
  },
  {
    question: '보험금액은 어떻게 설정하나요?',
    answer:
      '보험금액 입력란에 보장받고 싶은 금액(원)을 입력하시면, 총 운임의 1%가 보험료로 추가 청구됩니다.',
  },
  {
    question: '최대 몇 개의 사진을 업로드할 수 있나요?',
    answer:
      '최대 5장까지 업로드 가능합니다. 5장을 초과하면 자동으로 앞 5장만 등록됩니다.',
  },
  {
    question: '배송 상태는 어떻게 확인하나요?',
    answer:
      '매칭이 완료되면 내 계정의 “주문 내역”에서 FedEx의 트래킹 링크를 통해 실시간 상태를 조회할 수 있습니다.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx)

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">자주 묻는 질문 (FAQ)</h1>
      <div className="space-y-2">
        {faqs.map((item, idx) => (
          <div key={idx} className="shadow rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">{item.question}</span>
              <span className="text-xl">{openIndex === idx ? '−' : '+'}</span>
            </button>
            <div
              className={`px-4 transition-max-h duration-300 overflow-hidden ${
                openIndex === idx ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p className="text-gray-700">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
