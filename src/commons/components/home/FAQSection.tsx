'use client'

import React from 'react'

const FAQSection = () => {
  const faqs = [
    { question: '관세 정보는 어디서 확인하나요?', link: '#' },
    { question: '배송 상태는 어떻게 조회하나요?', link: '#' },
  ]

  return (
    <ul className="space-y-3">
      {faqs.map(({ question, link }) => (
        <li
          key={question}
          className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
        >
          <span className="text-gray-700">{question}</span>
          <a href={link} className="text-toss-500 font-medium hover:underline">
            보기
          </a>
        </li>
      ))}
    </ul>
  )
}

export default FAQSection
