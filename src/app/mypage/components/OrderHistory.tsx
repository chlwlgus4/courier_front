'use client'

import React from 'react'
import { FiClipboard } from 'react-icons/fi'

export default function OrderHistory() {
  // TODO: 실제 주문 내역 fetch
  const fakeOrders = [
    { id: 1, service: '해외배송', date: '2025-05-12', category: '해외배송' },
    { id: 2, service: '구매대행', date: '2025-05-08', category: '해외배송' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FiClipboard className="w-5 h-5 mr-2 text-cyan-700" />
        주문 내역
      </h2>
      {fakeOrders.length ? (
        <ul className="space-y-2">
          {fakeOrders.map((o) => (
            <li key={o.id} className="flex justify-between">
              <span>
                주문 #{o.id} – {o.category}
              </span>
              <time className="text-sm text-gray-500">{o.date}</time>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">아직 주문 내역이 없습니다.</p>
      )}
    </div>
  )
}
