'use client'

import React, { useEffect, useState } from 'react'
import { Country } from '@/app/(protected)/overseas/types/country'
import { overseasStore } from '@/store/overseasStore'

export default function CountrySelect() {
  const { overseas, setOverseas } = overseasStore()

  const [country, setCountry] = useState<string>(overseas?.country as string)
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    if (overseas?.country === country) return

    setOverseas({
      ...overseas,
      country,
    })
  }, [country, overseas, setOverseas])

  useEffect(() => {
    // 예: 로컬 JSON 또는 API에서 국가 리스트를 가져온다
    fetch('/data/countries.json')
      .then((res) => res.json())
      .then((list: Country[]) => setCountries(list))
  }, [])

  return (
    <div className="w-full mx-auto">
      <label className="block mb-1 font-medium">국가 선택</label>
      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="" disabled>
          국가를 선택하세요
        </option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  )
}
