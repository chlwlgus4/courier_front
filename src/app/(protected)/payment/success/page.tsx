'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { paymentConfirm } from '@/api/payment'

const Page = () => {
  const params = useSearchParams()

  const requestData = {
    orderId: params.get('orderId') || '',
    amount: params.get('amount') || '',
    paymentKey: params.get('paymentKey') || '',
  }

  useEffect(() => {
    const confirm = async () => {
      const res = await paymentConfirm(requestData)

      console.log(res)

      // if (!response.ok) {
      //   // 결제 실패 비즈니스 로직을 구현하세요.
      //   // navigate(`/fail?message=${json.message}&code=${json.code}`)
      //   return
      // }
    }
    confirm()
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${params.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(params.get('amount')).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${params.get('paymentKey')}`}</p>
      </div>
    </div>
  )
}

export default Page
