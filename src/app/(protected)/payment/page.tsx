'use client'

import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk'
import React, { useEffect } from 'react'

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'
const customerKey = 'Ck_9PRZ_vg9SaPmi7t9T7'

const Page = () => {
  const clientKey = 'test_ck_NXXXXXXXXXXXXXXXXXXXXXXX' // 실제 Client Key로 교체
  const orderId = `order_${new Date().getTime()}`
  const amount = 19800 // 예: 견적 total

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.tosspayments.com/v1/payment'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    const tossPayments = await loadTossPayments(
      'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
    )

    tossPayments.payment().requestPayment({
      method: 'CARD',
      amount: {
        currency: 'KRW',
        value: amount,
      },
      orderId,
      orderName: 'Shoong 배송 요금',
      customerName: '홍길동',
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    })
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">결제하기</h2>
      <p>
        총 결제금액:{' '}
        <strong className="text-blue-600">{amount.toLocaleString()}원</strong>
      </p>
      <button
        onClick={handlePayment}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
      >
        카드로 결제하기
      </button>
    </div>
  )
}

export default Page
