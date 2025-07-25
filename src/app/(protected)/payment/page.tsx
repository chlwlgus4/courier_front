'use client'

import {
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk'
import React, { useEffect, useState } from 'react'

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'
const customerKey = 'Ck_9PRZ_vg9SaPmi7t9T7'

const Page = () => {
  const orderId = `order_${new Date().getTime()}`
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 50_000,
  })

  const [ready, setReady] = useState(false)
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null)

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey)
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      })
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets)
    }

    fetchPaymentWidgets()
  }, [clientKey, customerKey])

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount)

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ])

      setReady(true)
    }

    renderPaymentWidgets()
  }, [widgets])

  useEffect(() => {
    if (widgets == null) {
      return
    }

    widgets?.setAmount(amount)
  }, [widgets, amount])

  const handlePayment = async () => {
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      await widgets?.requestPayment({
        orderId: 'pHpybcM6EYiz6UbtG_HRy',
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      })
    } catch (error) {
      // 에러 처리하기
      console.error(error)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <p>
        총 결제금액:{' '}
        <strong className="text-blue-600">
          {amount.value.toLocaleString()}원
        </strong>
      </p>
      <div id="payment-method" />
      {/* 이용약관 UI */}
      <div id="agreement" />
      {/* 쿠폰 체크박스 */}
      <button
        disabled={!ready}
        onClick={handlePayment}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
      >
        결제하기
      </button>
    </div>
  )
}

export default Page
