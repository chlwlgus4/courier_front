'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import type { Country } from '@/app/(protected)/overseas/types/country'
import { overseasStore } from '@/store/overseasStore'

type Address = {
  country: Country | null
  city: string
  address: string
  addressDetail: string
  postal: string
}

export default function ShippingTypePage() {
  const router = useRouter()
  const { overseas, setOverseas } = overseasStore()

  const [origin, setOrigin] = useState<Address>({
    country: overseas?.originCountry ?? null,
    city: overseas?.originCity ?? '',
    address: overseas?.originAddress ?? '',
    addressDetail: overseas?.originAddressDetail ?? '',
    postal: overseas?.originPostalCode ?? '',
  })
  const [dest, setDest] = useState<Address>({
    country: overseas?.destCountry ?? null,
    city: overseas?.destCity ?? '',
    address: overseas?.destAddress ?? '',
    addressDetail: overseas?.destAddressDetail ?? '',
    postal: overseas?.destinationPostalCode ?? '',
  })

  const isValid =
    origin.country && dest.country && origin.address && dest.address

  const handleNext = () => {
    setOverseas({
      ...overseas,
      originCountry: origin.country,
      originCity: origin.city,
      originAddress: origin.address,
      originAddressDetail: origin.addressDetail,
      originPostalCode: origin.postal,
      destCountry: dest.country,
      destCity: dest.city,
      destAddress: dest.address,
      destAddressDetail: dest.addressDetail,
      destinationPostalCode: dest.postal,
    })
    router.push('/overseas/duty')
  }

  // (실제 국가는 JSON / API 호출로 불러온다고 가정)
  const COUNTRY_LIST: Country[] = [
    { code: 'KR', name: 'South Korea' },
    { code: 'US', name: 'United States of America' },
    /* ... */
  ]

  const inputClass =
    'w-full shadow-md rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-toss-200'

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 출발지 & 도착지 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow rounded-lg p-6">
        {/* 출발지 */}
        <div className="space-y-4">
          <h3 className="font-medium">출발지</h3>
          {/* 국가 선택 */}
          <div className="flex items-center shadow-md rounded px-3 py-2">
            <select
              className="ml-2 flex-1 focus:outline-none"
              value={origin.country?.code ?? ''}
              onChange={(e) =>
                setOrigin((o) => ({
                  ...o,
                  country:
                    COUNTRY_LIST.find((c) => c.code === e.target.value) || null,
                }))
              }
            >
              <option value="">국가 선택</option>
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="도시"
            className={inputClass}
            value={origin.city}
            onChange={(e) => setOrigin((o) => ({ ...o, city: e.target.value }))}
          />
          <input
            type="text"
            placeholder="주소 *"
            className={inputClass}
            value={origin.address}
            onChange={(e) =>
              setOrigin((o) => ({ ...o, address: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="상세주소 (선택)"
            className={inputClass}
            value={origin.addressDetail}
            onChange={(e) =>
              setOrigin((o) => ({ ...o, addressDetail: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="우편번호"
            className={inputClass}
            value={origin.postal}
            onChange={(e) =>
              setOrigin((o) => ({ ...o, postal: e.target.value }))
            }
          />
        </div>

        {/* 도착지 */}
        <div className="space-y-4">
          <h3 className="font-medium">도착지</h3>
          {/* 국가 선택 */}
          <div className="flex items-center shadow rounded px-3 py-2">
            <select
              className="ml-2 flex-1 focus:outline-none"
              value={dest.country?.code ?? ''}
              onChange={(e) =>
                setDest((d) => ({
                  ...d,
                  country:
                    COUNTRY_LIST.find((c) => c.code === e.target.value) ?? null,
                }))
              }
            >
              <option value="">국가 선택</option>
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="도시"
            className={inputClass}
            value={dest.city}
            onChange={(e) => setDest((d) => ({ ...d, city: e.target.value }))}
          />
          <input
            type="text"
            placeholder="주소 *"
            className={inputClass}
            value={dest.address}
            onChange={(e) =>
              setDest((d) => ({ ...d, address: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="상세주소 (선택)"
            className={inputClass}
            value={dest.addressDetail}
            onChange={(e) =>
              setDest((d) => ({ ...d, addressDetail: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="우편번호"
            className={inputClass}
            value={dest.postal}
            onChange={(e) => setDest((d) => ({ ...d, postal: e.target.value }))}
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="w-full bg-toss-500 hover:bg-toss-700 text-white py-3 rounded-lg disabled:opacity-50"
      >
        다음
      </button>
    </div>
  )
}
