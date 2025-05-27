'use client'

import React, { useState } from 'react'

export default function OrderPage() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD123',
      date: '2025-05-26',
      status: '배송중',
      origin: '한국',
      destination: '미국',
      price: 12000,
    },
    {
      id: 'ORD124',
      date: '2025-05-25',
      status: '완료',
      origin: '중국',
      destination: '한국',
      price: 8000,
    },
  ])

  const [filter, setFilter] = useState('전체')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // 필터 + 검색 + 기간
  const filteredOrders = orders.filter((order) => {
    const matchFilter = filter === '전체' || order.status === filter
    const matchSearch =
      order.id.includes(search) ||
      order.origin.includes(search) ||
      order.destination.includes(search)
    const matchDate =
      (!startDate || new Date(order.date) >= new Date(startDate)) &&
      (!endDate || new Date(order.date) <= new Date(endDate))
    return matchFilter && matchSearch && matchDate
  })

  return (
    <div className="flex-1 p-4 space-y-4">
      <input
        type="text"
        placeholder="주문번호, 출발지, 도착지 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-toss-500 focus:ring-opacity-100 focus:ring-offset-2"
      />

      <div className="flex space-x-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        />
        <span className="self-center">~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        />
      </div>

      <div className="flex space-x-2 mb-4">
        {['전체', '배송중', '완료'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status
                ? 'bg-toss-500 text-white'
                : 'bg-white text-gray-700 hover:bg-sky-200'
            } transition`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredOrders.map((o) => (
        <div
          key={o.id}
          className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-medium text-gray-800">주문번호: {o.id}</p>
            <p className="text-sm text-gray-500">날짜: {o.date}</p>
            <p className="text-sm text-gray-500">
              경로: {o.origin} → {o.destination}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`${o.status === '완료' ? 'text-green-500' : 'text-blue-500'} font-semibold`}
            >
              {o.status}
            </p>
            <p className="mt-1 font-medium text-gray-800">
              ₩{o.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
