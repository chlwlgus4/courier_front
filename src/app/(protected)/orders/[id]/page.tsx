import { notFound } from 'next/navigation'
import React from 'react'

interface OrderItem {
  id: string
  name: string
  qty: number
  price: number
}

interface Recipient {
  name: string
  address: string
  phone: string
}

interface OrderDetail {
  id: string
  date: string
  status: string
  origin: string
  destination: string
  price: number
  items: OrderItem[]
  trackingUrl: string
  paymentMethod: string
  recipient: Recipient
}

// 더미 데이터 함수 (추후 실제 API 호출로 교체)
async function getOrderById(id: string): Promise<OrderDetail | null> {
  // 예시: id가 'ORD123'일 때만 값 반환
  if (id === 'ORD123') {
    return {
      id,
      date: '2025-05-26',
      status: '배송중',
      origin: '한국',
      destination: '미국',
      price: 12000,
      items: [
        { id: '1', name: '상품 A', qty: 2, price: 5000 },
        { id: '2', name: '상품 B', qty: 1, price: 2000 },
      ],
      trackingUrl: 'https://tracking.example.com/ORD123',
      paymentMethod: '신용카드',
      recipient: {
        name: '홍길동',
        address: '서울특별시 강남구 테헤란로 123',
        phone: '010-1234-5678',
      },
    }
  }
  return null
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrderById(id)
  if (!order) {
    return notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* 헤더 */}
      <header>
        <p className="text-sm text-gray-600">주문번호: {order.id}</p>
      </header>

      {/* 요약 카드 */}
      <section className="bg-white shadow rounded-lg p-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">주문일</p>
          <p className="font-medium">{order.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">상태</p>
          <p
            className={`font-medium ${
              order.status === '완료' ? 'text-green-600' : 'text-blue-600'
            }`}
          >
            {order.status}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">출발지 → 도착지</p>
          <p className="font-medium">
            {order.origin} → {order.destination}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">결제 금액</p>
          <p className="font-medium">₩{order.price.toLocaleString()}</p>
        </div>
      </section>

      {/* 상품 목록 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">상품 목록</h2>
        <ul className="divide-y">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="py-2 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">수량: {item.qty}</p>
              </div>
              <p className="font-medium">
                ₩{(item.price * item.qty).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 추적 링크 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">배송 추적</h2>
        <a
          href={order.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-toss-500 hover:underline"
        >
          추적 페이지로 이동 →
        </a>
      </section>

      {/* 결제 수단 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">결제 수단</h2>
        <p className="font-medium">{order.paymentMethod}</p>
      </section>

      {/* 수취인 정보 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">수취인 정보</h2>
        <div className="space-y-1">
          <p>
            <span className="text-sm text-gray-500">이름: </span>
            <span className="font-medium">{order.recipient.name}</span>
          </p>
          <p>
            <span className="text-sm text-gray-500">주소: </span>
            <span className="font-medium">{order.recipient.address}</span>
          </p>
          <p>
            <span className="text-sm text-gray-500">전화번호: </span>
            <span className="font-medium">{order.recipient.phone}</span>
          </p>
        </div>
      </section>
    </div>
  )
}
