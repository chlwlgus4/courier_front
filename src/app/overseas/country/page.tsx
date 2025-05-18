'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CountrySelect from '@/app/overseas/components/CountrySelect'
import useRequireAuth from '@/hook/useRequireAuth'

const Page = () => {
  const router = useRouter()
  const [country, setCountry] = useState<string>('')

  const { user } = useRequireAuth()
  if (!user) return null

  const handleNext = () => {
    if (!country) return
    router.push(`/overseas/duty?country=${encodeURIComponent(country)}`)
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">배송 국가를 선택하세요</h1>
      <CountrySelect value={country} onChange={setCountry} />
      <button
        onClick={handleNext}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
        disabled={!country}
      >
        다음
      </button>
    </div>
  )
}

export default Page
