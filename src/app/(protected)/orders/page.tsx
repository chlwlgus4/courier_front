'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getOrders } from '@/api/orders'
import { OrderGetResponse } from '@/commons/types/orders'
import useLoadingStore from '@/store/loadingStore'

export default function OrderPage() {
  const [orders, setOrders] = useState<OrderGetResponse[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('전체')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { setLoading } = useLoadingStore()
  const observer = useRef<IntersectionObserver | null>(null)

  const handleGetOrders = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      if (isLoading) return
      setIsLoading(true)
      if (reset) setLoading(true)

      try {
        const params = new URLSearchParams({
          page: pageNum.toString(),
          size: '20',
        })

        // 필터 조건 활성화
        if (filter !== '전체') params.append('status', filter)
        if (search) params.append('search', search)
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)

        const { data } = await getOrders(params)
        // TypeScript 오류 수정: 안전한 배열 체크
        if (data?.orders && data.orders.length > 0) {
          if (reset) {
            setOrders(data.orders)
          } else {
            setOrders((prev) => [...prev, ...data.orders])
          }

          setHasMore(data.hasNext)
          setPage(pageNum)
        } else {
          // 데이터가 없는 경우 처리
          if (reset) {
            setOrders([])
          }
          setHasMore(false)
        }
      } catch (error) {
        console.error(error)
        // 에러 발생 시 처리
        if (reset) {
          setOrders([])
        }
        setHasMore(false)
      } finally {
        setIsLoading(false)
        if (reset) setLoading(false)
      }
    },
    [filter, search, startDate, endDate, isLoading],
  )

  useEffect(() => {
    handleGetOrders(0, true)
  }, [filter, search, startDate, endDate])

  // 무한 스크롤을 위한 마지막 요소 참조
  const lastOrderElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleGetOrders(page + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore, page, handleGetOrders],
  )

  // 검색 디바운스
  const [searchDebounce, setSearchDebounce] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchDebounce)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchDebounce])

  // 필터/검색 변경 시 초기화
  useEffect(() => {
    setOrders([])
    setPage(0)
    setHasMore(true)
  }, [filter, search, startDate, endDate])

  // 상태에 따른 한글 표시
  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '대기중'
      case 'PROCESSING':
        return '확인됨'
      case 'SHIPPED':
        return '배송중'
      case 'DELIVERED':
        return '완료'
      case 'CANCELLED':
        return '취소됨'
      default:
        return status
    }
  }

  // 상태에 따른 색상 클래스
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500'
      case 'PROCESSING':
        return 'text-blue-500'
      case 'SHIPPED':
        return 'text-purple-500'
      case 'DELIVERED':
        return 'text-green-500'
      case 'CANCELLED':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="flex-1 p-4 space-y-4">
      <label htmlFor="search" className="sr-only">
        검색어
      </label>
      <input
        id={'search'}
        name={'search'}
        type="text"
        placeholder="출발지, 도착지, 주소 검색"
        value={searchDebounce}
        onChange={(e) => setSearchDebounce(e.target.value)}
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

      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {[
          '전체',
          'PENDING',
          'PROCESSING',
          'SHIPPED',
          'DELIVERED',
          'CANCELLED',
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === status
                ? 'bg-toss-500 text-white'
                : 'bg-white text-gray-700 hover:bg-sky-200'
            } transition`}
          >
            {status === '전체' ? '전체' : getStatusText(status)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => {
          const isLast = index === orders.length - 1
          return (
            <button
              key={`${order.originCountry}-${order.destinationCountry}-${index}`}
              ref={isLast ? lastOrderElementRef : null}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full text-left"
              onClick={() => {
                console.log('주문 클릭:', order)
              }}
              aria-label={`주문 상세 보기: ${order.originCountry} -> ${order.destinationCountry}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {order.shippingType}
                    </span>
                    <span
                      className={`text-sm font-semibold ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>출발:</strong> {order.originCountry}{' '}
                    {order.originAddress}
                    {order.originAddressDetail &&
                      ` ${order.originAddressDetail}`}
                  </p>

                  <p className="text-sm text-gray-600 mb-2">
                    <strong>도착:</strong> {order.destinationCountry}{' '}
                    {order.destinationAddress}
                    {order.destinationAddressDetail &&
                      ` ${order.destinationAddressDetail}`}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>무게: {order.weight}kg</span>
                    {order.insuranceValue > 0 && (
                      <span>
                        보험가액: ₩{order.insuranceValue.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {order.notes && (
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      메모: {order.notes}
                    </p>
                  )}
                </div>

                {order.images?.slice(0, 3).map((image) => (
                  <div className="ml-4" key={image.originalFilename}>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {image.base64Data ? (
                        <Image
                          src={`data:${image.contentType};base64,${image.base64Data}`}
                          alt={image.originalFilename}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">사진</span>
                      )}
                    </div>
                  </div>
                ))}
                {order.images && order.images.length > 3 && (
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-600 font-medium">
                        +{order.images.length - 3}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* 로딩 인디케이터 */}
      {isLoading && orders.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-toss-500"></div>
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && orders.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          모든 주문을 불러왔습니다.
        </div>
      )}

      {/* 검색 결과가 없을 때 */}
      {!isLoading && orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )
}
